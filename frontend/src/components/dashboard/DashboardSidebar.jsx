import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LogoutModal from '../auth/LogoutModal';
import './DashboardSidebar.css';

const DashboardSidebar = ({ activeTab, onTabSelect }) => {
  const { user } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <aside className="dash-sidebar-container">
      {/* Profile Info Header - Avatar completely omitted per specification */}
      <div className="dash-sidebar-profile">
        <h3 className="dash-user-name">{user?.fullName}</h3>
        <span className="dash-user-email">{user?.email}</span>
      </div>

      <hr className="dash-sidebar-divider" />

      {/* Vertical Navigation Link Stack */}
      <nav className="dash-sidebar-nav">
        <button 
          type="button" 
          className="dash-nav-pill active"
          onClick={() => onTabSelect('upcoming')}
        >
          <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          My Bookings
        </button>

        <button type="button" className="dash-nav-pill">
          <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Profile Settings
        </button>

        <button type="button" className="dash-nav-pill">
          <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          Saved Hotels
        </button>

        <button 
          type="button" 
          className="dash-nav-pill logout-pill"
          onClick={() => setIsLogoutOpen(true)}
        >
          <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Log Out
        </button>
      </nav>

      <LogoutModal 
        isOpen={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)} 
      />
    </aside>
  );
};

export default DashboardSidebar;
