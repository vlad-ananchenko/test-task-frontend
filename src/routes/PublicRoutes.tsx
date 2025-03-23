import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicRoute from '../guards/publicRoute/PublicRoute';
import SignInForm from '../components/signInForm/SignInForm';

const PublicRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <PublicRoute>
            <SignInForm />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default PublicRoutes;
