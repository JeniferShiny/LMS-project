import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth(); // Add loading here

  // 1. While the app is checking for a saved token, show nothing or a spinner
  // This prevents the "auto-redirect to login" on page refresh
  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  // 2. If no user is logged in after loading finishes, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists but their role isn't in the allowed list
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. If authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;