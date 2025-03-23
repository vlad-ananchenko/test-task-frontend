import React, { ReactElement } from 'react';

import { useTableData, TableDataProvider } from '../contexts/TableDataContext';
import FileUploader from '../components/fileUploader/FileUploader';
import TableData from '../components/tableData/TableData';

import styles from './TableDataPage.module.css';

const TableDataPageContent = (): ReactElement => {
  const { data, loading, error, uploadFile } = useTableData();

  return (
    <div className={styles.tableDataPage}>
      <FileUploader onFileUpload={uploadFile} />
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && <TableData data={data} />}
    </div>
  );
};

const TableDataPage: React.FC = () => (
  <TableDataProvider>
    <TableDataPageContent />
  </TableDataProvider>
);

export default TableDataPage;
