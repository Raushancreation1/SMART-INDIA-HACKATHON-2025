import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Made optional
  redirectTo?: string; // Optional custom redirect path
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [], // Default to empty array if not provided
  redirectTo = '/' // Default redirect path
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is provided, check if user has any of the allowed roles
  if (allowedRoles.length > 0) {
    const hasRequiredRole = user && allowedRoles.includes(user.role);
    if (!hasRequiredRole) {
      // Redirect to home or custom path if user doesn't have required role
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
