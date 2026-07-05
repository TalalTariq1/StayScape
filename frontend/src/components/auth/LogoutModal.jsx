import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LogoutModal.css';

// Reusable confirm-logout modal. Used from both Navbar and DashboardSidebar.
// Pass isOpen + onClose as props, same pattern as AuthModal.
const LogoutModal = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirmLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <div className="logout-overlay" onClick={onClose}>
      <div className="logout-modal-card" onClick={(e) => e.stopPropagation()}>
        <p className="logout-title">Log out of StayScape?</p>
        <p className="logout-subtitle">
          {user?.fullName ? `You're currently signed in as ${user.fullName}.` : 'You will be signed out of your account.'}
        </p>

        <div className="logout-actions">
          <button className="logout-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="logout-confirm-btn" onClick={handleConfirmLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
