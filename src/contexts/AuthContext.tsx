import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginSuccess, logout } from '../store/slices/authSlice';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [initialized, setInitialized] = useState(false);

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch(loginSuccess(user));
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      } finally {
        setInitialized(true);
      }
    };

    checkAuth();
  }, [dispatch]);

  const login = (userData: User) => {
    // In a real app, you would make an API call to log in
    // For now, we'll just store the user data in localStorage
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch(loginSuccess(userData));
  };

  const handleLogout = () => {
    // Clear auth data from storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
  };

  const deleteAccount = async (): Promise<void> => {
    try {
      // In a real app, you would make an API call to delete the account
      // For now, we'll just clear the auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  };

  // Show loading state while checking auth status
  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout: handleLogout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
