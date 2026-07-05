import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';
import LogoutModal from '../auth/LogoutModal';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const {
    user,
    isAuthenticated,
    isModalOpen,
    modalMode,
    openLoginModal,
    openSignupModal,
    closeAuthModal
  } = useAuth();

  const handleDashboardClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openLoginModal();
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* Brand Logo */}
          <div className="navbar-brand">
            <Link to="/">StayScape</Link>
          </div>

          {/* Main Navigation Menu links */}
          <ul className="navbar-menu">
            <li>
              <NavLink to="/" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/hotels" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                Hotels
              </NavLink>
            </li>

            {/* Conditionally render Regular User Dashboard vs Admin Panel */}
            {isAuthenticated && user?.isAdmin ? (
              <li>
                <NavLink to="/admin" className={({ isActive }) => `menu-link admin-menu-link ${isActive ? 'active' : ''}`}>
                  Admin Panel
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={handleDashboardClick}
                  className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/about" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
          </ul>

          {/* Right Actions / Profile Segment */}
          <div className="navbar-actions">
            <Link to="/hotels" style={{ textDecoration: 'none' }}>
              <button className="btn-book-now">Book Now</button>
            </Link>

            {isAuthenticated ? (
              <div className="navbar-profile-group">
                <span className="navbar-user-name">{user?.fullname}</span>
                <button className="nav-logout-btn" onClick={() => setIsLogoutOpen(true)}>
                  Log out
                </button>
              </div>
            ) : (
              <button className="nav-signup-btn" onClick={openSignupModal}>
                Sign Up
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* Auth & Logout Modals */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeAuthModal}
        initialTab={modalMode}
      />

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </>
  );
};

export default Navbar;