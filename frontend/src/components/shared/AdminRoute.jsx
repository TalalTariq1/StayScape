import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If Context session values are initializing, block redirection evaluation hooks
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '12px' }}>
        <p style={{ color: '#64748b', fontSize: '15px' }}>Verifying security credentials...</p>
      </div>
    );
  }

  // If unauthorized or a standard customer profile, bounce them back to user dashboard safely
  if (!user || !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;