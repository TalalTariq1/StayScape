import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createBooking } from '../services/bookingService';
import BookingSummaryCard from '../components/booking/BookingSummaryCard';
import GuestCounter from '../components/booking/GuestCounter';
import './Booking.css';

const NavbarPlaceholder = () => <div style={{ display: 'none' }} />;

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { hotel, selectedRoom, checkInDate, checkOutDate } = state || {};

  if (!hotel || !selectedRoom || !checkInDate || !checkOutDate) {
    return (
      <div className="booking-error-screen">
        <div className="error-message-box">
          <p className="error-message-text">No booking selected. Please choose a hotel first.</p>
          <Link to="/hotels" className="error-fallback-cta-link">Browse Hotels</Link>
        </div>
      </div>
    );
  }

  // Input states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Submit Status Lifecycle State ('idle' | 'loading' | 'success')
  const [submitStatus, setSubmitStatus] = useState('idle');

  // Math Pipeline Calculations
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);
  const timeDiff = end.getTime() - start.getTime();
  const totalNights = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;
  
  const subtotal = selectedRoom.price * totalNights;
  const serviceFee = 35; // Match backend calculation formula (10%)
  const totalInvoiceAmount = subtotal + serviceFee;

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (submitStatus !== 'idle') return; // Blocks multiple concurrent clicks
    setValidationError('');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setValidationError('Please complete all required fields.');
      return;
    }
    if (!agreeTerms) {
      setValidationError('You must agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    // =========================================================
    // REFACTORED PAYLOAD: Flattened to align with your API Schema
    // =========================================================
    const compiledPayload = {
      hotelId: hotel._id || hotel.id,
      roomId: selectedRoom._id || selectedRoom.id, // Fixed: Pass exact room key identifier
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: Number(adults),
      children: Number(children),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      specialRequests: specialRequests.trim()
    };

    setSubmitStatus('loading');

    try {
      // Fire direct API action request immediately
      await createBooking(compiledPayload);
      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('idle');
      console.error("Save pipeline intercept caught:", err);
      setValidationError(err.response?.data?.message || 'An operational runtime error occurred saving your booking profile. Please try again.');
    }
  };

  return (
    <div className="booking-page-root-view">
      <NavbarPlaceholder />

      <div className="booking-page-container">
        {/* Breadcrumb & Navigation Control Area */}
        <nav className="booking-breadcrumb">
          <button 
            type="button" 
            className="breadcrumb-back-cta"
            onClick={() => navigate(-1)}
            disabled={submitStatus === 'loading'}
          >
            <svg className="back-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back
          </button>
          <span className="breadcrumb-divider">|</span>
          <span className="breadcrumb-node">Hotels</span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-node">{hotel.name}</span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-node active">Confirm and book</span>
        </nav>

        <h1 className="booking-primary-headline">Confirm and book</h1>

        <div className="booking-layout-split-grid">
          <aside className="booking-aside-layout-column">
            <BookingSummaryCard 
              hotel={hotel}
              selectedRoom={selectedRoom}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              adults={adults}
              children={children}
              totalNights={totalNights}
              subtotal={subtotal}
              serviceFee={serviceFee}
              total={totalInvoiceAmount}
            />
          </aside>

          <main className="booking-main-details-column">
            <h2 className="form-section-headline">Guest details</h2>
            <p className="form-section-subtitle">Enter the primary guest's information for this booking</p>

            {validationError && (
              <div className="form-runtime-error-notice" style={{ color: '#dc2626', background: '#fee2e2', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontWeight: '500' }}>
                {validationError}
              </div>
            )}

            <div className="form-fields-stack">
              <div className="form-input-row-split">
                <div className="form-input-group">
                  <label className="field-input-label">First Name</label>
                  <input 
                    type="text" 
                    className="field-native-text-input" 
                    placeholder="e.g. John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={submitStatus === 'loading'}
                  />
                </div>
                <div className="form-input-group">
                  <label className="field-input-label">Last Name</label>
                  <input 
                    type="text" 
                    className="field-native-text-input" 
                    placeholder="e.g. Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={submitStatus === 'loading'}
                  />
                </div>
              </div>

              <div className="form-input-group">
                <label className="field-input-label">Email address</label>
                <input 
                  type="email" 
                  className="field-native-text-input" 
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitStatus === 'loading'}
                />
              </div>

              <div className="form-input-group">
                <label className="field-input-label">Phone number</label>
                <input 
                  type="tel" 
                  className="field-native-text-input" 
                  placeholder="e.g. +923331234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={submitStatus === 'loading'}
                />
              </div>

              <div className="form-input-group">
                <label className="field-input-label">Guests</label>
                <GuestCounter 
                  adults={adults}
                  children={children}
                  onAdultsChange={setAdults}
                  onChildrenChange={setChildren}
                  disabled={submitStatus === 'loading'}
                />
              </div>

              <div className="form-input-group">
                <label className="field-input-label">Special requests (Optional)</label>
                <textarea 
                  className="field-native-textarea-input" 
                  placeholder="Any requests or information we should know?"
                  rows={4}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  disabled={submitStatus === 'loading'}
                />
              </div>

              <div className="form-checkbox-alignment-row">
                <input 
                  type="checkbox" 
                  id="agreeTerms"
                  className="field-native-checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={submitStatus === 'loading'}
                />
                <label htmlFor="agreeTerms" className="checkbox-text-label">
                  I agree to the <span className="text-link-node">Terms of Service</span> and <span className="text-link-node">Privacy Policy</span>. I understand that my data will be handled according to StayScape's security standards.
                </label>
              </div>

              <div className="form-submit-block-area">
                <button 
                  type="button"
                  onClick={handleFormSubmission}
                  className={`form-pill-action-cta-submit ${submitStatus === 'loading' ? 'state-processing' : ''}`}
                  disabled={submitStatus === 'loading'}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <span className="css-native-loading-spinner" />
                      Processing your booking...
                    </>
                  ) : (
                    `Confirm and Pay $${totalInvoiceAmount}`
                  )}
                </button>
                
                <div className="secure-encryption-badge-line">
                  <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Secure SSL Encrypted Payment</span>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* Success Overlay Confirmation Modal Context Node */}
      {submitStatus === 'success' && (
        <div className="success-modal-overlay">
          <div className="success-modal-card">
            <div className="success-checkmark-circle">
              <svg className="checkmark-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="success-modal-title">Booking confirmed!</h3>
            <p className="success-modal-description">
              Your reservation at <span className="highlight-hotel-name">{hotel.name}</span> has been successfully booked.
            </p>
            <button 
              type="button" 
              className="success-modal-cta-btn"
              onClick={() => navigate('/dashboard')}
            >
              View My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;