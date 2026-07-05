import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; 
import './SubComponents.css';

const BookingSidebar = ({ hotel, selectedRoom }) => {
  const navigate = useNavigate(); 
  const { isAuthenticated, openLoginModal } = useAuth(); 

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState(todayStr);
  const [checkOutDate, setCheckOutDate] = useState(tomorrowStr);

  // FIXED: Instead of returning null, show an explicit fallback message if the hotel has no rooms
  if (!selectedRoom) {
    return (
      <div className="sticky-booking-card no-rooms-sidebar-card">
        <div className="sidebar-rate-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <span className="sidebar-price-unit" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#e53e3e' }}>
            Unavailable
          </span>
        </div>
        <div className="sidebar-invoice-breakdown" style={{ textAlign: 'center', padding: '20px 10px' }}>
          <div className="fallback-icon" style={{ fontSize: '2rem', marginBottom: '10px' }}>🏨</div>
          <h4 style={{ margin: '0 0 8px 0', color: '#2d3748' }}>Hotel has no rooms</h4>
          <p style={{ fontSize: '0.875rem', color: '#718096', margin: 0 }}>
            There are currently no room listings assigned to this property.
          </p>
        </div>
        <button 
          className="sidebar-booking-action-btn" 
          type="button" 
          disabled 
          style={{ backgroundColor: '#cbd5e0', cursor: 'not-allowed' }}
        >
          Rooms Unavailable
        </button>
      </div>
    );
  }

  // Live Math Pipeline
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);
  
  const timeDiff = end.getTime() - start.getTime();
  const staysCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const isDateRangeValid = checkInDate && checkOutDate && staysCount > 0;

  // REFACTORED: Stripped out the service fee additions from the detail sidebar view
  const rawSubtotal = isDateRangeValid ? selectedRoom.price * staysCount : 0;
  const grandTotalInvoice = rawSubtotal;

  const handleBookingRedirect = () => {
    if (!isDateRangeValid) return;

    if (!isAuthenticated) {
      openLoginModal(); 
      return; 
    }

    navigate('/booking', {
      state: {
        hotel,
        selectedRoom,
        checkInDate,
        checkOutDate
      }
    });
  };

  return (
    <div className="sticky-booking-card">
      <div className="sidebar-rate-header">
        <span className="sidebar-prominent-price">${selectedRoom.price}</span>
        <span className="sidebar-price-unit">/ night</span>
      </div>

      {/* Interactive Form Frame */}
      <div className="sidebar-inputs-frame">
        <div className="sidebar-inputs-row">
          <div className="input-frame-cell cell-right-border">
            <label className="sidebar-input-label">CHECK-IN</label>
            <input 
              type="date" 
              className="sidebar-native-picker"
              value={checkInDate}
              min={todayStr}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>
          <div className="input-frame-cell">
            <label className="sidebar-input-label">CHECK-OUT</label>
            <input 
              type="date" 
              className="sidebar-native-picker"
              value={checkOutDate}
              min={checkInDate || todayStr}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
        </div>
        <div className="input-frame-full-cell">
          <label className="sidebar-input-label">GUESTS</label>
          <span className="sidebar-static-guests-value">
            Up to {selectedRoom.capacity || 2} guests (Max capacity)
          </span>
        </div>
      </div>

      {/* Invoice Math Breakdown Container Node */}
      <div className="sidebar-invoice-breakdown">
        {isDateRangeValid ? (
          <>
            <div className="invoice-row">
              <span className="invoice-label-text">${selectedRoom.price} × {staysCount} {staysCount === 1 ? 'night' : 'nights'}</span>
              <span className="invoice-value-text">${rawSubtotal}</span>
            </div>
            {/* Removed the 'StayScape service fee' row entirely from here */}
            <hr className="invoice-divider" />
            <div className="invoice-row total-prominent">
              <span className="invoice-total-label">Total before taxes & fees</span>
              <span className="invoice-total-value">${grandTotalInvoice}</span>
            </div>
          </>
        ) : (
          <div className="date-error-notice">
            Select valid dates
          </div>
        )}
      </div>

      <button 
        className="sidebar-booking-action-btn" 
        type="button"
        disabled={!isDateRangeValid}
        onClick={handleBookingRedirect}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingSidebar;