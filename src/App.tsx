import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainLayout from './layouts/mainLayout/MainLayout';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

const App = (): ReactElement => (
  <Router>
    <NotificationProvider>
      <AuthProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </AuthProvider>
    </NotificationProvider>
  </Router>
);

export default App;
