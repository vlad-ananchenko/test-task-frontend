import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import { SignInResponse } from '../interfaces';

export const useSignIn = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();
  const { showError, showSuccess } = useNotification();

  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        }
      );

      const data = (await response.json()) as SignInResponse;

      if (response.ok) {
        setIsAuthenticated(true);
        showSuccess(data?.message || 'Login successful');
        navigate('/admin/dashboard', { replace: true });
      } else {
        showError(data?.error || 'Login failed');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message || 'Network error');
      } else {
        showError('Network error');
      }
      console.error('useSignIn :: error >>>', err);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};
