import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminBookingById } from '../services/adminService';
import './AdminBookingDetail.css';

const AdminBookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getAdminBookingById(id);
        setBooking(data.booking || data);
      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div className="admin-detail-page">Loading...</div>;
  if (!booking) return <div className="admin-detail-page">Booking not found.</div>;

  // Data Mappings
  const hotel = booking.hotelId || {};
  const room = booking.room || {};
  const totalNights = booking.nights || 1;
  const SERVICE_FEE = 35; // Fixed Service Fee

  return (
    <div className="admin-detail-page">
      <div className="admin-detail-container">
        <button className="admin-back-btn" onClick={() => navigate('/admin/bookings')}>← Back to Admin Bookings</button>

        <div className="admin-header-row">
          <h1>Booking Summary</h1>
          <div className="admin-header-right" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div className={`status-badge badge-${booking.status}`}>{booking.status}</div>
            <div className="admin-badge-box">🛡️ ADMIN MANAGEMENT VIEW</div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-section" style={{ display: 'flex', gap: '20px' }}>
            <div style={{ width: '150px', height: '100px', background: '#e2e8f0', borderRadius: '8px' }}>
               {hotel.images && <img src={hotel.images[0]} alt={hotel.name} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'8px'}} />}
            </div>
            <div>
              <h2>{hotel.name || 'Hotel Name'}</h2>
              <p className="admin-label">Booking ID: {booking._id}</p>
              <p className="admin-label">User Account ID: {booking.userId || 'Guest'}</p>
            </div>
          </div>

          <div className="admin-section">
            <h3>Stay & Guest Information</h3>
            <div className="admin-data-grid">
              <div><p className="admin-label">Guest</p><p className="admin-value">{booking.firstName} {booking.lastName}</p></div>
              <div><p className="admin-label">Email</p><p className="admin-value">{booking.email}</p></div>
              <div><p className="admin-label">Phone</p><p className="admin-value">{booking.phone || 'N/A'}</p></div>
              <div><p className="admin-label">Special Requests</p><p className="admin-value">{booking.specialRequests || 'None'}</p></div>
              <div><p className="admin-label">Check-in</p><p className="admin-value">{new Date(booking.checkInDate).toLocaleDateString()}</p></div>
              <div><p className="admin-label">Check-out</p><p className="admin-value">{new Date(booking.checkOutDate).toLocaleDateString()}</p></div>
            </div>
          </div>

          <div className="admin-section">
            <h3>Financial Breakdown</h3>
            <div className="admin-data-grid">
              <div><p className="admin-label">Nightly Rate</p><p className="admin-value">${room.price}</p></div>
              <div><p className="admin-label">Nights</p><p className="admin-value">{totalNights}</p></div>
              <div><p className="admin-label">Service Fee</p><p className="admin-value">${SERVICE_FEE}</p></div>
              <div><p className="admin-label" style={{fontWeight:'bold'}}>Total Charged</p><p className="admin-value" style={{fontWeight:'bold'}}>${(room.price * totalNights) + SERVICE_FEE}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetail;