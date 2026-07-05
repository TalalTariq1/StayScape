import React, { useState, useEffect } from 'react';
import { getMyBookings, cancelBooking } from '../services/bookingService';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import BookingStats from '../components/dashboard/BookingStats';
import BookingCard from '../components/dashboard/BookingCard';
import Navbar from '../components/shared/Navbar'; // 1. Use your real navigation header component
import './Dashboard.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [loading, setLoading] = useState(true);

  // Dynamic Metrics Evaluation Pipeline Module
  const [stats, setStats] = useState({
    totalCount: 0,
    daysRemaining: null,
    completedCount: 0
  });

  const fetchDashboardDataPipeline = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings();
      
      // Handle potential wrapped server object structure variations cleanly ({ success: true, bookings: [...] })
      const cleanList = data && data.bookings ? data.bookings : (Array.isArray(data) ? data : []);
      
      const currentToday = new Date();
      currentToday.setHours(0, 0, 0, 0);

      // =========================================================
      // NORMALIZATION PARSING ENGINE (Updated to match MongoDB Keys)
      // =========================================================
      const mappedBookings = cleanList.map(b => {
        // Swap b.checkIn for b.checkInDate
        const checkInDateObj = new Date(b.checkInDate);
        checkInDateObj.setHours(0, 0, 0, 0);
        
        let contextualStatus = b.status;
        // Map backend state flags ('confirmed' vs old local mock text 'upcoming')
        if (contextualStatus !== 'cancelled') {
          contextualStatus = checkInDateObj >= currentToday ? 'upcoming' : 'completed';
        }

        return { ...b, status: contextualStatus };
      });

      setBookings(mappedBookings);

      // Calculation of Distinct Metrics
      const totalCount = mappedBookings.length;
      const completedCount = mappedBookings.filter(b => b.status === 'completed').length;
      
      // Calculate Remaining countdown days context using live b.checkInDate key
      const activeUpcomingTrips = mappedBookings
        .filter(b => b.status === 'upcoming')
        .map(b => new Date(b.checkInDate).getTime())
        .sort((a, b) => a - b);

      let daysRemaining = null;
      if (activeUpcomingTrips.length > 0) {
        const soonestTripTime = activeUpcomingTrips[0];
        const millisecondDiff = soonestTripTime - currentToday.getTime();
        daysRemaining = Math.max(0, Math.ceil(millisecondDiff / (1000 * 60 * 60 * 24)));
      }

      setStats({ totalCount, daysRemaining, completedCount });
    } catch (err) {
      console.error('Error compiling dashboard calculations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardDataPipeline();
  }, []);

  const handleBookingCancellation = async (id) => {
    try {
      await cancelBooking(id);
      await fetchDashboardDataPipeline(); // Recalculate metrics updates mapping natively
    } catch (err) {
      console.error("Cancellation handling pipeline failed:", err);
    }
  };

  const displayedFilteredList = bookings.filter(b => {
    if (activeTab === 'upcoming') return b.status === 'upcoming';
    return b.status === 'completed' || b.status === 'cancelled';
  });

  return (
    <div className="dash-page-root-view">
      {/* Real layout navbar wrapper component */}
      <Navbar />

      <div className="dash-workspace-container" style={{ paddingTop: '100px' }}>
        <div className="dash-layout-split-grid">
          
          {/* Column Sidebars Element */}
          <DashboardSidebar activeTab={activeTab} onTabSelect={setActiveTab} />

          {/* Main Context Workspace Segment */}
          <main className="dash-main-content-column">
            <BookingStats 
              totalCount={stats.totalCount}
              daysRemaining={stats.daysRemaining}
              completedCount={stats.completedCount}
            />

            {/* Tab Controller Section matches specifications header rows */}
            <div className="dash-tabs-nav-bar-row">
              <button 
                type="button" 
                className={`dash-tab-trigger ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button 
                type="button" 
                className={`dash-tab-trigger ${activeTab === 'past' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past Bookings
              </button>
            </div>

            {/* Injections List Cards Segment */}
            <div className="dash-bookings-vertical-stack">
              {loading ? (
                <div className="dash-content-fallback-notice">Loading your dashboard workspace details...</div>
              ) : displayedFilteredList.length > 0 ? (
                displayedFilteredList.map(item => (
                  <BookingCard 
                    // Map unique key definitions to MongoDB _id parameter fields safely
                    key={item._id || item.id} 
                    booking={item} 
                    onCancel={handleBookingCancellation} 
                  />
                ))
              ) : (
                <div className="dash-content-fallback-notice">
                  No {activeTab} booking listings documented in this system segment.
                </div>
              )}
            </div>

          </main>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;