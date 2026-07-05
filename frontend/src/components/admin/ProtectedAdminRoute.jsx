import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Change from "../context/AuthContext" to:
import { useAuth } from '../../context/AuthContext';

const ProtectedAdminRoute = () => {
  const { user, isAuthenticated } = useAuth();

  // If not logged in, or logged in but NOT an admin, redirect home
  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If admin, render the nested dashboard paths
  return <Outlet />;
};

export default ProtectedAdminRoute;