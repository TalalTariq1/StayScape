import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllHotels } from '../../services/hotelService'; 
import './FeaturedHotels.css';

const FeaturedHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllHotels().then((res) => {
      if (res) {
        /* PAYLOAD FIX: Safely unwrap the array if it's nested in an object wrapper */
        const arrayData = Array.isArray(res) 
          ? res 
          : (res.hotels || res.data || []);

        // Slice the first 4 items to keep the horizontal section compact
        setHotels(arrayData.slice(0, 4));
      }
      setLoading(false);
    }).catch(err => {
      console.error("Error loading featured hotels:", err);
      setLoading(false);
    });
  }, []);

  const handleWishlistClick = (e) => {
    e.preventDefault();   
    e.stopPropagation();  
  };

  if (loading) {
    return <div className="hotels-loading">Loading top destinations...</div>;
  }

  return (
    <section className="hotels-section">
      <div className="hotels-container">
        
        {/* Top Header Row */}
        <div className="hotels-header">
          <div className="header-left">
            <h2 className="hotels-title">Featured Hotels</h2>
            <p className="hotels-subtitle">Handpicked stays our travelers love.</p>
          </div>
          <Link to="/hotels" className="view-all-link">
            View All 
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="hotels-scroll-wrapper">
          {hotels.map((hotel) => (
            /* DATABASE KEY FIX: Fallback to hotel._id dynamically for database tracking paths */
            <Link 
              to={`/hotels/${hotel._id || hotel.id}`} 
              key={hotel._id || hotel.id} 
              className="hotel-card"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              
              {/* Image Shell */}
              <div className="hotel-image-container">
                {/* SCHEMA FIX: Supporting both images arrays and individual fields safely */}
                <img 
                  src={hotel.images?.[0] || hotel.image || 'https://via.placeholder.com/400x250?text=No+Image+Available'} 
                  alt={hotel.name} 
                  className="hotel-img" 
                  loading="lazy" 
                />
                {hotel.badge && <span className="hotel-badge">{hotel.badge}</span>}
                
                <button 
                  className="wishlist-btn" 
                  aria-label="Add to wishlist"
                  onClick={handleWishlistClick}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              {/* Info Details Section */}
              <div className="hotel-info">
                <h3 className="hotel-name">{hotel.name}</h3>
                
                <div className="hotel-location">
                  <svg className="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {hotel.city}, {hotel.country}
                </div>

                <div className="hotel-rating">
                  <span className="star">★</span>
                  <span className="rating-score">{hotel.rating ? hotel.rating.toFixed(1) : 'New'}</span>
                  <span className="review-count">({hotel.reviewCount || 0} reviews)</span>
                </div>

                <div className="hotel-price-row">
                  <span className="price-label">From </span>
                  <span className="price-amount">${hotel.pricePerNight}</span>
                  <span className="price-unit"> / night</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedHotels;