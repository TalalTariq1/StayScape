import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../services/adminService'; 
import { useNavigate } from 'react-router-dom';
import './AdminBookings.css';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getAllBookings();
                setBookings(data || []);
            } catch (err) {
                setError('Failed to load bookings. Please check your connection.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div className="admin-loading">Fetching reservations...</div>;
    if (error) return <div className="admin-error">{error}</div>;

    return (
        <div className="admin-bookings-container">
            <h2 className="admin-page-title">Manage Reservations ({bookings.length})</h2>
            
            <div className="bookings-grid">
                {bookings.map((booking) => (
                    <div className="booking-card" key={booking._id}>
                        <div className="booking-header">
                            <h3>{booking.hotelId?.name || 'Unknown Hotel'}</h3>
                            <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                        </div>
                        <div className="booking-details">
                            <p><strong>Guest:</strong> {booking.firstName} {booking.lastName}</p>
                            <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ${booking.totalPrice}</p>
                        </div>
                        <button 
                            className="view-detail-btn" 
                            onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                        >
                            View Full Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBookings;