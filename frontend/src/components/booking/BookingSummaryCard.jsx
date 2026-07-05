import React from 'react';
import './BookingSummaryCard.css';

const BookingSummaryCard = ({ hotel, selectedRoom, checkInDate, checkOutDate, adults, children, totalNights, subtotal, serviceFee, total }) => {
  
  const formatDateString = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="summary-wrapper-aside">
      <div className="summary-card-body">
        {/* Profile Card Header */}
        <div className="summary-hotel-profile">
          {/* FIXED: Reading from hotel.images array fallback to match your schema initialization */}
          <img 
            src={hotel.images?.[0] || hotel.image || 'https://via.placeholder.com/120x120?text=Hotel'} 
            alt={hotel.name} 
            className="summary-hotel-thumbnail" 
          />
          <div className="summary-profile-meta">
            <h3 className="summary-hotel-name">{hotel.name}</h3>
            <span className="summary-hotel-location">{hotel.address || hotel.location}</span>
            <span className="summary-hotel-rating">★ {hotel.rating?.toFixed(1)}</span>
          </div>
        </div>

        <hr className="summary-divider" />

        {/* Stay Detail Metrics Block */}
        <div className="summary-stay-metrics">
          <h4 className="summary-section-tag">YOUR STAY</h4>
          
          <div className="summary-metric-row">
            <span className="metric-label">Room</span>
            <span className="metric-value">{selectedRoom.name}</span>
          </div>
          
          <div className="summary-metric-row">
            <span className="metric-label">Check-in</span>
            <span className="metric-value">{formatDateString(checkInDate)}</span>
          </div>
          
          <div className="summary-metric-row">
            <span className="metric-label">Check-out</span>
            <span className="metric-value">{formatDateString(checkOutDate)}</span>
          </div>
          
          <div className="summary-metric-row">
            <span className="metric-label">Guests</span>
            <span className="metric-value">
              {adults} {adults === 1 ? 'Adult' : 'Adults'}
              {children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
            </span>
          </div>
        </div>

        <hr className="summary-divider" />

        {/* Financial Calculation System */}
        <div className="summary-invoice-ledger">
          <div className="invoice-ledger-row">
            <span className="ledger-label">${selectedRoom.price} × {totalNights} {totalNights === 1 ? 'night' : 'nights'}</span>
            <span className="ledger-value">${subtotal}</span>
          </div>
          <div className="invoice-ledger-row">
            <span className="ledger-label">Service fee</span>
            <span className="ledger-value">${serviceFee}</span>
          </div>
          
          <div className="invoice-ledger-row total-prominent-row">
            <span className="total-label">Total</span>
            <span className="total-value">${total}</span>
          </div>
        </div>
      </div>

      {/* Security Border Notice Panel Context */}
      <div className="cancellation-policy-box">
        <svg className="policy-shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <p className="policy-notice-text">
          Free cancellation until {formatDateString(checkInDate)}. After that, cancellations are non-refundable.
        </p>
      </div>
    </div>
  );
};

export default BookingSummaryCard;