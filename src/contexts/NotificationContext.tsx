import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import '../styles/notification';

type NotificationType = 'error' | 'success' | 'info';

interface NotificationState {
  type: NotificationType;
  message: string;
}

interface NotificationContextValue {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  showError: () => {},
  showSuccess: () => {},
  showInfo: () => {},
});

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );

  const showError = useCallback((message: string) => {
    setNotification({ type: 'error', message });
  }, []);

  const showSuccess = useCallback((message: string) => {
    setNotification({ type: 'success', message });
  }, []);

  const showInfo = useCallback((message: string) => {
    setNotification({ type: 'info', message });
  }, []);

  const handleClose = useCallback(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const value = useMemo(
    () => ({
      showError,
      showSuccess,
      showInfo,
    }),
    [showError, showSuccess, showInfo]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {notification && (
        <div
          className={`container snackbar-${notification.type}`}
          onClick={handleClose}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableDataProvider');
  }
  return context;
};

export { NotificationProvider, useNotification };
