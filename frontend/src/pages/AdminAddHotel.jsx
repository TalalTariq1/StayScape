// src/pages/AdminAddHotel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdminHotel } from '../services/adminService';
import './AdminAddHotel.css';

const AdminAddHotel = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Core Form State (Rooms & Reviews omitted per requirements)
  const [hotelForm, setHotelForm] = useState({
    name: '',
    city: '',
    country: '',
    address: '',
    description: '',
    pricePerNight: 0,
    starRating: 5,
    badge: '',
    amenities: '', // Handled via clean comma-separated parsing
    isActive: true
  });

  // Dynamic Array for URLs to fuel live source image previews
  const [imageUrlInputs, setImageUrlInputs] = useState(['']);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;

    if (type === 'checkbox') finalValue = checked;
    else if (name === 'pricePerNight' || name === 'starRating') finalValue = Number(value);

    setHotelForm((prev) => ({ ...prev, [name]: finalValue }));
  };

  // Manage Dynamic Image Input Fields
  const handleImageUrlChange = (index, value) => {
    const updatedInputs = [...imageUrlInputs];
    updatedInputs[index] = value;
    setImageUrlInputs(updatedInputs);
  };

  const addImageField = () => {
    setImageUrlInputs([...imageUrlInputs, '']);
  };

  const removeImageField = (index) => {
    if (imageUrlInputs.length > 1) {
      setImageUrlInputs(imageUrlInputs.filter((_, idx) => idx !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format clean arrays to match Mongoose schema expectations
    const processedAmenities = hotelForm.amenities
      ? hotelForm.amenities.split(',').map((item) => item.trim()).filter(Boolean)
      : [];

    const processedImages = imageUrlInputs.map((url) => url.trim()).filter(Boolean);

    const finalPayload = {
      ...hotelForm,
      amenities: processedAmenities,
      images: processedImages.length > 0 ? processedImages : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600']
    };

    try {
      await createAdminHotel(finalPayload);
      setShowSuccessModal(true); // Fire up the modern UI success overlay popup
    } catch (err) {
      alert('Failed to register the property asset code in the main cluster.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-hotel-workspace">
      <header className="workspace-title-header">
        <h1>Add New Property</h1>
        <p>Deploy a fresh stay configuration asset into the network database node matrix.</p>
      </header>

      <div className="form-layout-wrapper">
        <form onSubmit={handleSubmit}>
          
          {/* GENERAL DATA CARD */}
          <div className="form-section-card">
            <h3>Basic Details</h3>
            
            <div className="form-input-group">
              <label>PROPERTY NAME</label>
              <input type="text" name="name" value={hotelForm.name} onChange={handleInputChange} placeholder="e.g. Capital View Hotel" required />
            </div>

            <div className="input-row-grid three-columns">
              <div className="form-input-group">
                <label>CITY</label>
                <input type="text" name="city" value={hotelForm.city} onChange={handleInputChange} placeholder="e.g. Islamabad" required />
              </div>
              <div className="form-input-group">
                <label>COUNTRY</label>
                <input type="text" name="country" value={hotelForm.country} onChange={handleInputChange} placeholder="e.g. Pakistan" required />
              </div>
              <div className="form-input-group">
                <label>STAR RATING (1-5)</label>
                <input type="number" name="starRating" value={hotelForm.starRating} onChange={handleInputChange} min="1" max="5" required />
              </div>
            </div>

            <div className="form-input-group">
              <label>STREET ADDRESS</label>
              <input type="text" name="address" value={hotelForm.address} onChange={handleInputChange} placeholder="e.g. Sector G-5, Club Road" required />
            </div>

            <div className="form-input-group">
              <label>DESCRIPTION EXCERPT</label>
              <textarea name="description" value={hotelForm.description} onChange={handleInputChange} placeholder="Provide an operational breakdown of properties, surrounding highlights, and environment specs..." required />
            </div>
          </div>

          {/* LOGISTICS & METRICS CARD */}
          <div className="form-section-card">
            <h3>Pricing & Marketing</h3>
            <div className="input-row-grid two-columns">
              <div className="form-input-group">
                <label>DEFAULT PRICE PER NIGHT</label>
                <div className="currency-prefix-box">
                  <span>$</span>
                  <input type="number" name="pricePerNight" value={hotelForm.pricePerNight} onChange={handleInputChange} min="0" required />
                </div>
              </div>
              <div className="form-input-group">
                <label>PROMOTIONAL BADGE TAG</label>
                <input type="text" name="badge" value={hotelForm.badge} onChange={handleInputChange} placeholder="e.g. Luxury, Highly Rated, 10% OFF" />
              </div>
            </div>

            <div className="form-input-group">
              <label>AMENITIES LIST (Comma-Separated Values)</label>
              <input type="text" name="amenities" value={hotelForm.amenities} onChange={handleInputChange} placeholder="e.g. Free WiFi, Swimming Pool, Room Service, Gym" />
            </div>

            <div className="status-toggle-wrapper">
              <label className="switch-container">
                <input type="checkbox" name="isActive" checked={hotelForm.isActive} onChange={handleInputChange} />
                <span className="toggle-slider"></span>
              </label>
              <div>
                <h4>Publish Immediately</h4>
                <p>Visible immediately to customers across exploration metrics panels when true.</p>
              </div>
            </div>
          </div>

          {/* LIVE IMAGE PREVIEW LIST CARD */}
          <div className="form-section-card">
            <div className="section-header-flex">
              <h3>Image URLs & Live Previews</h3>
              <button type="button" onClick={addImageField} className="action-link-btn">+ Add Another Link Route</button>
            </div>
            
            <div className="image-inputs-stack">
              {imageUrlInputs.map((url, index) => (
                <div className="image-row-item" key={index}>
                  <div className="input-control-block">
                    <input 
                      type="text" 
                      value={url} 
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="Paste clean direct image source link web URL..."
                    />
                    {imageUrlInputs.length > 1 && (
                      <button type="button" onClick={() => removeImageField(index)} className="remove-row-cross">✕</button>
                    )}
                  </div>

                  {/* LIVE VISUAL PREVIEW GENERATOR NODE */}
                  <div className="live-preview-box">
                    {url ? (
                      <img 
                        src={url} 
                        alt="Property Workspace Configuration Node" 
                        onError={(e) => { e.target.style.display = 'none'; }} // Gracefully hides if broken URL string
                      />
                    ) : (
                      <span className="placeholder-text">🖼️ Awaiting active url payload route mapping...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM FORM BUTTON ACTION ROW */}
          <div className="workspace-form-actions">
            <button type="button" onClick={() => navigate('/admin/hotels')} className="btn-cancel-link">Cancel</button>
            <button type="submit" className="btn-submit-save" disabled={isSubmitting}>
              {isSubmitting ? 'Configuring Asset Nodes...' : 'Publish Hotel Listing'}
            </button>
          </div>

        </form>
      </div>

      {/* 🌟 PREMIUM SUCCESS MODAL OVERLAY POPUP */}
      {showSuccessModal && (
        <div className="modal-overlay-blur">
          <div className="modern-success-card">
            <div className="success-icon-shield">✓</div>
            <h2>Hotel Successfully Added</h2>
            <p>The listing has been written to the remote database cluster node matrix and verified securely.</p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/admin/hotels');
              }}
              className="modal-redirect-btn"
            >
              Return to All Hotels
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddHotel;