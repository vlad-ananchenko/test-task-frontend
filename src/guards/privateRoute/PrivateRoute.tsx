import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
