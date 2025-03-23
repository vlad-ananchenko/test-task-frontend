import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

interface PublicRouteProps {
  children: ReactElement;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;
