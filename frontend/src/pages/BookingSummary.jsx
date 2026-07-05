import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingById, cancelBooking } from '../services/bookingService';
import Navbar from '../components/shared/Navbar'; 
import './BookingSummary.css';

const BookingSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const data = await getBookingById(id);
      
      // Unpack response object structure smoothly ({ booking: {...} } vs direct payload)
      const cleanData = data && data.booking ? data.booking : data;
      setBooking(cleanData);
    } catch (err) {
      console.error('Error fetching booking data:', err);
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookingDetails();
    }
  }, [id]);

  const handleCancelClick = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        setIsCancelling(true);
        await cancelBooking(id);
        await fetchBookingDetails(); // Re-fetch to refresh status badge dynamically
      } catch (err) {
        console.error('Error cancelling reservation:', err);
        alert('Could not cancel reservation. Please try again.');
      } finally {
        setIsCancelling(false);
      }
    }
  };

  const handleDownloadReceipt = () => {
    console.log('Download receipt - not implemented yet');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="summary-status-screen">
        <p className="summary-status-text">Loading your reservation summary details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="summary-status-screen">
        <div className="summary-error-box">
          <p className="summary-status-text">Booking not found</p>
          <button type="button" className="summary-fallback-btn" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // FIXED RECONCILED DATA INTERFACING MAP (MongoDB Native Keys)
  // ==========================================
  const hotelName = booking.hotelId?.name || 'StayScape Destination';
  const hotelLocation = booking.hotelId ? `${booking.hotelId.city}, ${booking.hotelId.country}` : 'Location unavailable';
  const hotelImage = booking.hotelId?.images?.[0] || booking.hotelId?.image || null;
  const displayId = booking._id || booking.id;
  
  // Embedded schema nested attributes mapping
  const roomType = booking.room?.type || 'Selected Room Suite';
  const roomPricePerNight = booking.room?.price || 0;
  const roomCapacity = booking.room?.capacity ? `${booking.room.capacity} Guests Max` : 'Standard Limits Apply';
  
  const totalNights = booking.nights || 1;
  const subtotal = roomPricePerNight * totalNights;
  const serviceFee = booking.serviceFee || 0;
  const totalPaidAmount = booking.totalPrice || (subtotal + serviceFee);

  // Time metrics tracking configurations
  const currentToday = new Date();
  currentToday.setHours(0, 0, 0, 0);

  const checkInDateObj = new Date(booking.checkInDate);
  checkInDateObj.setHours(0, 0, 0, 0);

  // Match condition validations with backend status flag strings
  const isUpcoming = booking.status === 'upcoming' && checkInDateObj >= currentToday;
  
  // Auto-resolve completed status tags locally if past stay lifecycle boundaries
  const derivedDisplayStatus = (booking.status === 'upcoming' && checkInDateObj < currentToday) 
    ? 'completed' 
    : booking.status;

  return (
    <div className="summary-page-root-view">
      <Navbar />

      <div className="summary-page-container">
        
        {/* Navigation Link Controller */}
        <button 
          type="button" 
          className="summary-navigation-back-cta"
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: '500', color: '#007bef' }}
        >
          <svg className="back-chevron-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px' }}>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </button>

        {/* Workspace Frame Header Container */}
        <div className="summary-workspace-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 className="summary-primary-headline" style={{ margin: 0 }}>Booking Summary</h1>
          <span className={`summary-status-pill-badge badge-${derivedDisplayStatus}`} style={{ padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px' }}>
            {derivedDisplayStatus}
          </span>
        </div>

        {/* Main Comprehensive Core Summary Container */}
        <div className="summary-bordered-display-card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          
          {/* Section 1: Hotel Identification */}
          <div className="summary-display-card-section hotel-info-flexbox" style={{ display: 'flex', gap: '20px', padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <div className="hotel-thumbnail-fallback-frame" style={{ width: '160px', height: '110px', borderRadius: '6px', overflow: 'hidden', background: '#f1f5f9' }}>
              {hotelImage ? (
                <img src={hotelImage} alt={hotelName} className="hotel-summary-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="hotel-image-placeholder" style={{ width: '100%', height: '100%', background: '#cbd5e1' }} />
              )}
            </div>
            <div className="hotel-meta-details-column" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
              <h2 className="summary-hotel-name-title" style={{ margin: 0, fontSize: '22px' }}>{hotelName}</h2>
              <span className="summary-hotel-location-pin" style={{ color: '#64748b', fontSize: '14px' }}>📍 {hotelLocation}</span>
              <span className="summary-hotel-booking-id" style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px', background: '#f8fafc', padding: '2px 8px', width: 'fit-content', borderRadius: '4px' }}>
                Booking ID: {displayId}
              </span>
            </div>
          </div>

          {/* Section 2: Stay Schedule Details */}
          <div className="summary-display-card-section" style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 className="summary-inner-section-label" style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#94a3b8', letterSpacing: '0.05em' }}>STAY DETAILS</h3>
            <div className="summary-data-grid-two-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="summary-data-cell" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="cell-metadata-label" style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>SELECTED ROOM</span>
                <span className="cell-prominent-value" style={{ fontWeight: '500' }}>{roomType}</span>
              </div>
              <div className="summary-data-cell" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="cell-metadata-label" style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>ROOM LIMITS</span>
                <span className="cell-prominent-value" style={{ fontWeight: '500' }}>{roomCapacity}</span>
              </div>
              <div className="summary-data-cell" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="cell-metadata-label" style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>CHECK-IN DATE</span>
                <span className="cell-prominent-value" style={{ fontWeight: '500' }}>{formatDate(booking.checkInDate)}</span>
              </div>
              <div className="summary-data-cell" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="cell-metadata-label" style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>CHECK-OUT DATE</span>
                <span className="cell-prominent-value" style={{ fontWeight: '500' }}>{formatDate(booking.checkOutDate)}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Primary Guest Identification Data */}
          <div className="summary-display-card-section" style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 className="summary-inner-section-label" style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#94a3b8', letterSpacing: '0.05em' }}>PRIMARY GUEST INFORMATION</h3>
            <div className="summary-data-grid-two-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="summary-data-cell" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="cell-metadata-label" style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>GUEST NAME</span>
                <span className="cell-prominent-value" style={{ fontWeight: '500' }}>
                  {booking.firstName} {booking.lastName}
                </span>
              </div>
              <div className="summary-data-cell" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="cell-metadata-label" style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>CONTACT PHONE</span>
                <span className="cell-prominent-value" style={{ fontWeight: '500' }}>{booking.phone || 'N/A'}</span>
              </div>
              <div className="summary-data-cell" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="cell-metadata-label" style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>EMAIL ADDRESS</span>
                <span className="cell-prominent-value" style={{ fontWeight: '500' }}>{booking.email || 'N/A'}</span>
              </div>
              <div className="summary-data-cell" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="cell-metadata-label" style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>SPECIAL REQUESTS</span>
                <span className="cell-prominent-value" style={{ fontWeight: '500', color: booking.specialRequests ? '#1e293b' : '#94a3b8' }}>
                  {booking.specialRequests || 'None provided'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Invoice Breakdown Matrix */}
          <div className="summary-display-card-section payment-invoice-section" style={{ padding: '20px', background: '#f8fafc' }}>
            <h3 className="summary-inner-section-label" style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#94a3b8', letterSpacing: '0.05em' }}>PAYMENT SUMMARY</h3>
            
            <div className="invoice-math-breakdown-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span className="invoice-line-item-label" style={{ color: '#64748b' }}>${roomPricePerNight} × {totalNights} {totalNights === 1 ? 'night' : 'nights'}</span>
              <span className="invoice-line-item-value" style={{ fontWeight: '500' }}>${subtotal}</span>
            </div>
            
            <div className="invoice-math-breakdown-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
              <span className="invoice-line-item-label" style={{ color: '#64748b' }}>StayScape processing fee (10%)</span>
              <span className="invoice-line-item-value" style={{ fontWeight: '500' }}>${serviceFee}</span>
            </div>

            <hr className="invoice-total-divider-line" style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '12px 0' }} />

            <div className="invoice-math-breakdown-row absolute-total-prominent-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="invoice-grand-total-label" style={{ fontWeight: 'bold', fontSize: '16px' }}>Total Amount Charged</span>
              <span className="invoice-grand-total-value" style={{ fontWeight: 'bold', fontSize: '20px', color: '#0f172a' }}>${totalPaidAmount}</span>
            </div>
          </div>

        </div>

        {/* Action Controls Panel */}
        <div className="summary-action-buttons-flexrow" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '25px' }}>
          {isUpcoming && (
            <button 
              type="button" 
              className="summary-functional-pill-cta cancel-btn-trigger"
              onClick={handleCancelClick}
              disabled={isCancelling}
              style={{ padding: '10px 20px', background: '#fff', color: '#dc2626', border: '1px solid #fee2e2', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              {isCancelling ? 'Processing Cancellation...' : 'Cancel Booking'}
            </button>
          )}
          <button 
            type="button" 
            className="summary-functional-pill-cta receipt-btn-trigger"
            onClick={handleDownloadReceipt}
            style={{ padding: '10px 20px', background: '#007bef', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg className="receipt-download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Receipt
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingSummary;
