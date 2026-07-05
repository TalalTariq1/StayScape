// src/components/layout/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Sidebar Panel Left */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <span>StayScape Management</span>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/admin/overview" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            Overview
          </NavLink>
          <NavLink 
            to="/admin/hotels" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            All Hotels
          </NavLink>
          <NavLink 
            to="/admin/add-hotel" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            Add New Hotel
          </NavLink>
          {/* --- NEW BOOKINGS LINK --- */}
          <NavLink 
            to="/admin/bookings" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
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