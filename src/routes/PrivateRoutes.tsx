import { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboardLayout/DashboardLayout';
import PrivateRoute from '../guards/privateRoute/PrivateRoute';

const PrivateRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <Navigate
            to="dashboard"
            replace
          />
        }
      />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
