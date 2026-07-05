// src/pages/admin/AdminOverview.jsx
import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../services/adminService';
import './AdminOverview.css';

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await getAdminStats();
        // Since your response wraps the data object directly, set it here
        setStats(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to pull live platform analytics metrics.');
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <div className="admin-loading">Loading live database telemetry...</div>;
  if (error) return <div className="admin-error-banner">{error}</div>;

  return (
    <div className="overview-container">
      <header className="overview-header">
        <h1>Overview</h1>
        <p>Welcome back. Here's what's happening.</p>
      </header>

      {/* Stats Summary Panel Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">TOTAL HOTELS</span>
          <h2 className="stat-number">{stats?.metrics?.totalHotels || 0}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-label">TOTAL BOOKINGS</span>
          <h2 className="stat-number">{stats?.metrics?.totalBookings || 0}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-label">TOTAL REVENUE</span>
          <h2 className="stat-number">
            ${stats?.metrics?.totalRevenue?.toLocaleString() || '0'}
          </h2>
        </div>
      </div>

      {/* RECENT BOOKINGS FEED CONTAINER */}
      <section className="recent-section">
        <h3>Recent Bookings</h3>
        <div className="table-responsive">
          <table className="recent-table">
            <thead>
              <tr>
                <th>HOTEL</th>
                <th>GUEST</th>
                <th>CHECK-IN</th>
                <th>TOTAL PRICE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                stats.recentBookings.map((booking) => (
                  <tr key={booking._id}>
                    {/* Read nested fields matching your .populate() keys */}
                    <td className="hotel-name-cell">
                      {booking.hotelId?.name || 'Deleted Hotel'}
                    </td>
                    <td>
                      {booking.userId?.fullname || 'Unknown Guest'}
                    </td>
                    <td>
                      {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="price-cell">
                      ${booking.totalPrice || 0}
                    </td>
                    <td>
                      <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#999999' }}>
                    No recent bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminOverview;