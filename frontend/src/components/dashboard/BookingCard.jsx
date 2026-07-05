import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './BookingCard.css';

const BookingCard = ({ booking, onCancel }) => {
  const navigate = useNavigate(); 
  const [isCancelling, setIsCancelling] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Safely extract identifying key attributes
  const bookingId = booking._id || booking.id;

  const handleCancelClick = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setIsCancelling(true);
      await onCancel(bookingId); // Passes your actual alphanumeric DB object string ID
      setIsCancelling(false);
    }
  };

  const isUpcoming = booking.status === 'upcoming';
  const displayPrice = booking.totalPrice || 0;

  // ==========================================
  // UPDATED KEY MAPPING (Using .hotelId instead of .hotel)
  // ==========================================
  const hotelName = booking.hotelId?.name || 'StayScape Property';
  const hotelLocation = booking.hotelId 
    ? `${booking.hotelId.city}, ${booking.hotelId.country}` 
    : 'Location unavailable';
  const hotelImage = booking.hotelId?.images?.[0] || booking.hotelId?.image || null;

  return (
    <div className={`booking-list-row-card ${booking.status === 'cancelled' ? 'cancelled-card-dim' : ''}`}>
      <div className="booking-row-thumbnail-frame" style={{ width: '120px', height: '90px', overflow: 'hidden', borderRadius: '6px' }}>
        {hotelImage ? (
          <img 
            src={hotelImage} 
            alt={hotelName} 
            className="booking-row-thumbnail" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="hotel-image-placeholder" style={{ backgroundColor: '#e2e8f0', width: '100%', height: '100%' }} />
        )}
      </div>

      <div className="booking-row-content-mid">
        <div className="booking-badge-header-line">
          <span className={`booking-status-tag-badge status-${booking.status}`}>
            {booking.status}
          </span>
        </div>
        
        <h3 className="booking-hotel-headline-title">{hotelName}</h3>
        
        <div className="booking-meta-text-row">
          <span className="booking-location-pin">📍 {hotelLocation}</span>
        </div>

        <div className="booking-dates-timeframe-box">
          <svg className="calendar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span className="date-range-text">
            {formatDate(booking.checkInDate)} – {formatDate(booking.checkOutDate)}
          </span>
        </div>
      </div>

      <div className="booking-row-actions-right">
        <span className="booking-invoice-prominent">${displayPrice}</span>
        
        <div className="booking-interactive-anchors-group">
          {isUpcoming && (
            <button 
              type="button" 
              className="action-anchor-btn cancel-trigger"
              onClick={handleCancelClick}
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel'}
            </button>
          )}
          
          <button 
            type="button" 
            className="action-anchor-btn detail-trigger"
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            View Details 
            <svg className="action-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;