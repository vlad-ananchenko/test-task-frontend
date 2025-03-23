import { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRoutes = (): ReactElement => (
  <Routes>
    <Route
      path="/sign-in/*"
      element={<PublicRoutes />}
    />
    <Route
      path="/admin/*"
      element={<PrivateRoutes />}
    />
    <Route
      path="*"
      element={
        <Navigate
          to="/sign-in"
          replace
        />
      }
    />
  </Routes>
);

export default AppRoutes;
