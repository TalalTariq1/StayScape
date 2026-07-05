import React from 'react';
import './BookingStats.css';

const BookingStats = ({ totalCount, daysRemaining, completedCount }) => {
  return (
    <div className="stats-dashboard-row">
      {/* Metric 1 */}
      <div className="stat-metric-card">
        <span className="stat-card-label">BOOKINGS</span>
        <span className="stat-card-prominent-value">{totalCount}</span>
        <span className="stat-card-subtext">Total</span>
      </div>

      {/* Metric 2 */}
      <div className="stat-metric-card">
        <span className="stat-card-label">NEXT TRIP IN</span>
        <span className="stat-card-prominent-value">
          {daysRemaining !== null ? daysRemaining : '—'}
        </span>
        <span className="stat-card-subtext">
          {daysRemaining !== null ? 'Days remaining' : 'No upcoming trips'}
        </span>
      </div>

      {/* Metric 3 */}
      <div className="stat-metric-card">
        <span className="stat-card-label">COMPLETED</span>
        <span className="stat-card-prominent-value">{completedCount}</span>
        <span className="stat-card-subtext">Stays</span>
      </div>
    </div>
  );
};

export default BookingStats;