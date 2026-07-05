// src/components/layout/AdminLayout.jsx
import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      <button
        className="admin-sidebar-toggle"
        onClick={() => setSidebarOpen((prev) => !prev)}
        aria-label={sidebarOpen ? 'Close admin menu' : 'Open admin menu'}
      >
        <span />
        <span />
        <span />
      </button>

      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* Sidebar Panel Left */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <span>StayScape Management</span>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/admin/overview" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            Overview
          </NavLink>
          <NavLink 
            to="/admin/hotels" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            All Hotels
          </NavLink>
          <NavLink 
            to="/admin/add-hotel" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            Add New Hotel
          </NavLink>
          {/* --- NEW BOOKINGS LINK --- */}
          <NavLink 
            to="/admin/bookings" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            Manage Bookings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="exit-link">← Back to Guest Site</Link>
        </div>
      </aside>

      {/* Main Dynamic Workspace Right */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;