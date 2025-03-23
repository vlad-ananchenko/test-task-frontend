import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

import { fetchData, uploadCSV, fetchStatus } from '../services/dataService';
import { TableData } from '../interfaces/TableData';
import { useNotification } from '../contexts/NotificationContext';

interface TableDataContextValue {
  data: TableData;
  loading: boolean;
  error: string | null;
  reloadData: () => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
}

const TableDataContext = createContext<TableDataContextValue | null>(null);

interface TableDataProviderProps {
  children: ReactNode;
}

const TableDataProvider: React.FC<TableDataProviderProps> = ({ children }) => {
  const [data, setData] = useState<TableData>({ columns: [], rows: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { showInfo, showSuccess, showError } = useNotification();

  const reloadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await fetchData<TableData>();
      setData(fetchedData);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
      showError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const pollForStatus = useCallback(
    (runId: string) => {
      let attempts = 0;
      const maxAttempts = 10;
      const intervalMs = 1500;

      const checkStatus = async () => {
        try {
          const statusData = await fetchStatus(runId);

          if (statusData.status === 'done') {
            showSuccess(statusData.message || 'CSV processed successfully');

            await reloadData();
            return;
          }

          if (statusData.status === 'error') {
            showError(statusData.message || 'Worker error');
            return;
          }
        } catch (err) {
          console.error(err);
          showError('Error checking CSV status');
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, intervalMs);
        } else {
          showError('CSV processing took too long...');
        }
      };

      checkStatus();
    },
    [reloadData, showSuccess, showError]
  );

  const uploadFile = useCallback(
    async (file: File) => {
      setLoading(true);
      setError(null);

      try {
        const response = await uploadCSV(file);

        showInfo(response?.message);

        pollForStatus(response.runId);
      } catch (err) {
        setError('Failed to upload CSV');
        console.error(err);
        showError('Failed to upload CSV');
      } finally {
        setLoading(false);
      }
    },
    [showInfo, showError, pollForStatus]
  );

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  return (
    <TableDataContext.Provider
      value={{ data, loading, error, reloadData, uploadFile }}
    >
      {children}
    </TableDataContext.Provider>
  );
};

const useTableData = (): TableDataContextValue => {
  const context = useContext(TableDataContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableDataProvider');
  }
  return context;
};

export { TableDataProvider, useTableData };
