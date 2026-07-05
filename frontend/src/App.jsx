import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // 1. Added useLocation
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import BookingSummary from './pages/BookingSummary';

// --- ADMIN SYSTEM IMPORTS ---
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './pages/AdminOverview';
// Add this with your other page imports at the top
import AdminHotels from './pages/AdminHotels';
import AdminEditHotel from './pages/AdminEditHotel';
import AdminAddRoom from './pages/AdminAddRoom';
import AdminAddHotel from './pages/AdminAddHotel';
import AdminBookings from './pages/AdminBookings';
import AdminBookingDetail from './pages/AdminBookingDetail'
import About from './pages/About';

function App() {
  const location = useLocation(); // 2. Grab the current active URL path

  // 3. Check if the current path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {/* Persistent global layout headers */}
      <Navbar />

      {/* Main Application Page Switcher */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings/:id" element={<BookingSummary />} />
        <Route path="/about" element={<About />} />

        {/* 🔐 SECURE NESTED ADMIN REGION */}
        <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            {/* Instantly redirect raw /admin clicks into the overview dashboard page */}
            <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />

            {/* The main dashboard page */}
            <Route path="/admin/overview" element={<AdminOverview />} />

            {/* Master hotel inventory listing cards */}
            <Route path="/admin/hotels" element={<AdminHotels />} />

            {/* 🎨 NEW: DYNAMIC INLINE-CANVAS EDIT WORKSPACE */}
            <Route path="/admin/hotels/edit/:id" element={<AdminEditHotel />} />

            
    <Route path="/admin/hotels/add-room/:id" element={<AdminAddRoom />} />
    <Route path="/admin/add-hotel" element={<AdminAddHotel />} />
    <Route path="/admin/bookings" element={<AdminBookings />} />
     <Route path="/admin/bookings/:id" element={<AdminBookingDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>

      {/* 4. ONLY render the footer if we are NOT on an administrative page */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;