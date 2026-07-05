import React, { useEffect, useState } from 'react';
import { getAdminHotels, deleteAdminHotel } from '../services/adminService';
import { useNavigate } from 'react-router-dom';
import './AdminHotels.css';

const AdminHotels = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadHotels = async () => {
        try {
            const data = await getAdminHotels();
            const rawHotels = data.hotels || data || [];
            setHotels(rawHotels);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch hotel records.');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHotels();
    }, []);

    const handleDelete = async (hotelId, hotelName) => {
        const confirmDelete = window.confirm(`Are you sure you want to deactivate "${hotelName}"?`);
        if (confirmDelete) {
            try {
                await deleteAdminHotel(hotelId);
                setHotels(prevHotels =>
                    prevHotels.map(hotel =>
                        hotel._id === hotelId ? { ...hotel, isActive: false } : hotel
                    )
                );
            } catch (err) {
                alert('Failed to update hotel status.');
            }
        }
    };

    if (loading) return <div className="admin-loading">Loading hotels...</div>;
    if (error) return <div className="admin-error-banner">{error}</div>;

    const activeHotels = hotels.filter(hotel => hotel.isActive !== false);
    const inactiveHotels = hotels.filter(hotel => hotel.isActive === false);

    return (
        <div className="admin-hotels-container">

            <header className="admin-hotels-header">
                <h1>Hotel Listings</h1>
                <p>Manage your active properties and archived listings from one place.</p>
            </header>

            <section className="admin-inventory-section">
                <h2 className="section-title-heading active-heading">
                    Active Properties ({activeHotels.length})
                </h2>
                {activeHotels.length > 0 ? (
                    <div className="hotels-management-grid">
                        {activeHotels.map((hotel) => (
                            <div className="admin-hotel-card" key={hotel._id}>
                                <div className="card-image-placeholder">
                                    {hotel.images && hotel.images[0] ? (
                                        <img src={hotel.images[0]} alt={hotel.name} />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </div>
                                <div className="card-info-body">
                                    <div className="card-meta-row">
                                        <span className="card-city">{hotel.city}</span>
                                        <span className="card-stars">{'★'.repeat(hotel.starRating || 5)}</span>
                                    </div>
                                    <h3 className="card-hotel-title">{hotel.name}</h3>
                                    <p className="card-price-tag">
                                        <strong>${hotel.pricePerNight || hotel.price}</strong> / night
                                    </p>
                                    <div className="card-actions-row">
                                        <button onClick={() => navigate(`/admin/hotels/edit/${hotel._id}`)} className="mgmt-btn edit-btn">
                                            Edit Details
                                        </button>
                                        <button onClick={() => navigate(`/admin/hotels/add-room/${hotel._id}`)} className="mgmt-btn room-btn">
                                            + Add Room
                                        </button>
                                        <button onClick={() => handleDelete(hotel._id, hotel.name)} className="mgmt-btn delete-btn">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-inventory-state">
                        <p>No active properties listed yet.</p>
                    </div>
                )}
            </section>

            <hr className="section-divider-line" />

            <section className="admin-inventory-section">
                <h2 className="section-title-heading inactive-heading">
                    Inactive / Archived Properties ({inactiveHotels.length})
                </h2>
                {inactiveHotels.length > 0 ? (
                    <div className="hotels-management-grid">
                        {inactiveHotels.map((hotel) => (
                            <div className="admin-hotel-card archived-card" key={hotel._id}>
                                <div className="card-image-placeholder">
                                    {hotel.images && hotel.images[0] ? (
                                        <img src={hotel.images[0]} alt={hotel.name} />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </div>
                                <div className="card-info-body">
                                    <div className="card-meta-row">
                                        <span className="card-city">{hotel.city}</span>
                                        <span className="card-stars">{'★'.repeat(hotel.starRating || 5)}</span>
                                    </div>
                                    <h3 className="card-hotel-title archived-title">{hotel.name} (Archived)</h3>
                                    <p className="card-price-tag">
                                        <strong>${hotel.pricePerNight || hotel.price}</strong> / night
                                    </p>
                                    <div className="card-actions-row">
                                        <span className="delisted-badge">⚠️ Delisted from Catalog</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-inventory-state">
                        <p>No archived properties.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminHotels;
