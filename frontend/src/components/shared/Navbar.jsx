import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';
import LogoutModal from '../auth/LogoutModal';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleMobileDashboardClick = (e) => {
    handleDashboardClick(e);
    closeMobileMenu();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* Brand Logo */}
          <div className="navbar-brand">
            <Link to="/" onClick={closeMobileMenu}>StayScape</Link>
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
            <Link to="/hotels" className="navbar-book-link" onClick={closeMobileMenu}>
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

            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu} aria-hidden="true" />
      )}

      <div className={`mobile-menu-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-links">
          <li>
            <NavLink to="/" className="mobile-menu-link" onClick={closeMobileMenu}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/hotels" className="mobile-menu-link" onClick={closeMobileMenu}>Hotels</NavLink>
          </li>
          {isAuthenticated && user?.isAdmin ? (
            <li>
              <NavLink to="/admin" className="mobile-menu-link" onClick={closeMobileMenu}>Admin Panel</NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/dashboard"
                onClick={handleMobileDashboardClick}
                className="mobile-menu-link"
              >
                Dashboard
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/about" className="mobile-menu-link" onClick={closeMobileMenu}>About</NavLink>
          </li>
        </ul>

        <div className="mobile-menu-actions">
          {isAuthenticated ? (
            <>
              <span className="mobile-menu-user">{user?.fullname}</span>
              <button
                className="nav-logout-btn mobile-menu-logout"
                onClick={() => { setIsLogoutOpen(true); closeMobileMenu(); }}
              >
                Log out
              </button>
            </>
          ) : (
            <button
              className="nav-signup-btn mobile-menu-signup"
              onClick={() => { openSignupModal(); closeMobileMenu(); }}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>

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