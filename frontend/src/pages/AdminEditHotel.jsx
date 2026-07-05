// src/pages/AdminEditHotel.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateAdminHotel } from '../services/adminService';
import { getHotelById } from '../services/hotelService';
import './AdminEditHotel.css';

const AdminEditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Tracks active inline inputs for every single editable field
  const [editFields, setEditFields] = useState({
    name: false,
    city: false,
    country: false,
    address: false,
    description: false,
    badge: false,
    amenities: false,
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const data = await getHotelById(id);
        setHotel(data.hotel || data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch property details.');
        setLoading(false);
      }
    };
    fetchHotelDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotel((prev) => ({ ...prev, [name]: value }));
  };

  // Handles comma-separated values to easily update the amenities array
  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    const arrayValues = value.split(',').map(item => item.trim());
    setHotel((prev) => ({ ...prev, amenities: arrayValues }));
  };

  const toggleFieldEdit = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateAdminHotel(id, hotel);
      alert('Property updated successfully!');
      // Reset all edit states back to text view
      setEditFields({
        name: false,
        city: false,
        country: false,
        address: false,
        description: false,
        badge: false,
        amenities: false,
      });
    } catch (err) {
      alert('Failed to save adjustments to the database.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading property canvas...</div>;
  if (error) return <div className="admin-error-banner">{error}</div>;

  return (
    <div className="edit-canvas-container">
      <div className="canvas-main-content">
        
        {/* HERO IMAGE DISPLAY */}
        <div className="canvas-hero-image">
          {hotel.images?.[0] ? (
            <img src={hotel.images[0]} alt={hotel.name} />
          ) : (
            <div className="no-img-banner">🏨 No Image Banner</div>
          )}
        </div>

        {/* 1. HOTEL NAME */}
        <div className="canvas-field-group">
          <label>HOTEL NAME</label>
          {editFields.name ? (
            <input 
              type="text" 
              name="name" 
              value={hotel.name || ''} 
              onChange={handleInputChange} 
              onBlur={() => toggleFieldEdit('name')}
              autoFocus
            />
          ) : (
            <h1 className="editable-text-header" onClick={() => toggleFieldEdit('name')}>
              {hotel.name || 'Set Hotel Name'} <span className="edit-indicator-icon">✎</span>
            </h1>
          )}
        </div>

        {/* 2. REGION ROW (CITY & COUNTRY) */}
        <div className="canvas-meta-row">
          <div className="canvas-field-group">
            <label>CITY</label>
            {editFields.city ? (
              <input 
                type="text" 
                name="city" 
                value={hotel.city || ''} 
                onChange={handleInputChange} 
                onBlur={() => toggleFieldEdit('city')}
                autoFocus
              />
            ) : (
              <p className="editable-text-p" onClick={() => toggleFieldEdit('city')}>
                🏙️ {hotel.city || 'Set City'} <span className="edit-indicator-icon">✎</span>
              </p>
            )}
          </div>

          <div className="canvas-field-group">
            <label>COUNTRY</label>
            {editFields.country ? (
              <input 
                type="text" 
                name="country" 
                value={hotel.country || ''} 
                onChange={handleInputChange} 
                onBlur={() => toggleFieldEdit('country')}
                autoFocus
              />
            ) : (
              <p className="editable-text-p" onClick={() => toggleFieldEdit('country')}>
                🌍 {hotel.country || 'Set Country'} <span className="edit-indicator-icon">✎</span>
              </p>
            )}
          </div>

          <div className="canvas-field-group">
            <label>STAR RATING (Static)</label>
            <p className="static-stars">{'★'.repeat(hotel.starRating || 5)}</p>
          </div>
        </div>

        {/* 3. STREET ADDRESS */}
        <div className="canvas-field-group">
          <label>STREET ADDRESS</label>
          {editFields.address ? (
            <input 
              type="text" 
              name="address" 
              value={hotel.address || ''} 
              onChange={handleInputChange} 
              onBlur={() => toggleFieldEdit('address')}
              autoFocus
            />
          ) : (
            <p className="editable-text-p normal-weight" onClick={() => toggleFieldEdit('address')}>
              📍 {hotel.address || 'Set Street Address'} <span className="edit-indicator-icon">✎</span>
            </p>
          )}
        </div>

        {/* 4. DESCRIPTION BODY */}
        <div className="canvas-field-group description-block">
          <label>DESCRIPTION</label>
          {editFields.description ? (
            <textarea 
              name="description" 
              value={hotel.description || ''} 
              onChange={handleInputChange} 
              onBlur={() => toggleFieldEdit('description')}
              autoFocus
            />
          ) : (
            <p className="editable-textarea-p" onClick={() => toggleFieldEdit('description')}>
              {hotel.description || 'No description provided. Click here to add one.'} 
              <span className="edit-indicator-icon"> ✎</span>
            </p>
          )}
        </div>

        {/* 5. AMENITIES MANAGER */}
        <div className="canvas-field-group">
          <label>AMENITIES (Comma-Separated)</label>
          {editFields.amenities ? (
            <input 
              type="text" 
              name="amenities" 
              value={hotel.amenities?.join(', ') || ''} 
              onChange={handleAmenitiesChange} 
              onBlur={() => toggleFieldEdit('amenities')}
              placeholder="e.g. Free WiFi, Pool, Parking, Gym"
              autoFocus
            />
          ) : (
            <div className="editable-amenities-list" onClick={() => toggleFieldEdit('amenities')}>
              {hotel.amenities && hotel.amenities.length > 0 ? (
                hotel.amenities.map((item, idx) => (
                  <span key={idx} className="canvas-amenity-tag">{item}</span>
                ))
              ) : (
                <span className="no-amenities-text">No amenities configured. Click to add.</span>
              )}
              <span className="edit-indicator-icon inline">✎</span>
            </div>
          )}
        </div>
      </div>

      {/* DOCK BAR CONTROL SIDEBAR */}
      <div className="canvas-control-sidebar">
        <div className="control-sticky-box">
          <h3>Workspace Controls</h3>
          <p>Click on text fields on the left to activate active inline editor segments.</p>
          
          <hr />

          {/* 6. BASE PRICE NODE */}
          <div className="sidebar-field-group">
            <label>BASE PRICE PER NIGHT</label>
            <div className="price-input-wrapper">
              <span>$</span>
              <input 
                type="number" 
                name="pricePerNight" 
                value={hotel.pricePerNight || 0} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          {/* 7. BADGE STATUS INDICATOR */}
          <div className="sidebar-field-group">
            <label>MARKETING BADGE LABEL</label>
            {editFields.badge ? (
              <input 
                type="text" 
                name="badge" 
                value={hotel.badge || ''} 
                onChange={handleInputChange} 
                onBlur={() => toggleFieldEdit('badge')}
                placeholder="e.g. Best Seller, Luxury"
                className="sidebar-badge-input"
                autoFocus
              />
            ) : (
              <div className="editable-badge-display" onClick={() => toggleFieldEdit('badge')}>
                {hotel.badge ? (
                  <span className="active-badge-pill">{hotel.badge}</span>
                ) : (
                  <span className="no-badge-pill">No Active Badge</span>
                )}
                <span className="edit-indicator-icon inline">✎</span>
              </div>
            )}
          </div>

          <button 
            onClick={handleSaveChanges} 
            className="sidebar-action-btn primary-save"
            disabled={isSaving}
          >
            {isSaving ? 'Saving Changes...' : 'Save All Changes'}
          </button>
          
          <button 
            onClick={() => navigate('/admin/hotels')} 
            className="sidebar-action-btn secondary-cancel"
          >
            Back to All Hotels
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditHotel;