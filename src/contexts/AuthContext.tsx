import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';

import { useNotification } from './NotificationContext';

interface AuthContextValue {
  isAuthenticated: boolean | null;
  authChecked: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  authChecked: false,
  setIsAuthenticated: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const { showError } = useNotification();
  const { pathname } = useLocation();

  const authCheckUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/check`;

  useEffect(() => {
    if (!authCheckUrl) {
      console.error('Auth check URL is not defined');
      if (!pathname.startsWith('/sign-in') && pathname !== '/') {
        showError('Configuration error');
      }
      setIsAuthenticated(false);
      setAuthChecked(true);
      return;
    }

    fetch(authCheckUrl, { credentials: 'include' })
      .then(async (res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          const data = await res.json().catch(() => ({}));
          if (!pathname.startsWith('/sign-in') && pathname !== '/') {
            showError(`Auth check failed: ${data.message || 'Unknown error'}`);
          }
        }
      })
      .catch((error) => {
        console.error('Network error or server not available >>>', error);
        setIsAuthenticated(false);
        if (!pathname.startsWith('/sign-in') && pathname !== '/') {
          showError('Network error or server not available');
        }
      })
      .finally(() => {
        setAuthChecked(true);
      });
  }, [authCheckUrl, showError, pathname]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      authChecked,
      setIsAuthenticated,
    }),
    [isAuthenticated, authChecked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableDataProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
