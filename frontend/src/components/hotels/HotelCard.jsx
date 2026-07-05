import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './HotelCard.css';

const HotelCard = ({ hotel }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = (e) => {
    e.stopPropagation(); // Prevents clicking the heart from navigating to the detail page
    setIsLiked(!isLiked);
  };

  return (
    /* DYNAMIC FIX: Changed route parameter reference to prioritize MongoDB's hotel._id over hotel.id */
    <Link to={`/hotels/${hotel._id || hotel.id}`} className="hotel-card-link-wrapper" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="hotel-card">
        <div className="card-image-wrapper">
          {/* SCHEMA FIX: Checks if backend sends an images array first, then falls back to single image field or a placeholder */}
          <img 
            src={hotel.images?.[0] || hotel.image || 'https://via.placeholder.com/400x250?text=No+Image+Available'} 
            alt={hotel.name} 
            className="card-img" 
          />
          {hotel.badge && <span className="card-badge">{hotel.badge}</span>}
          <button 
            className={`card-heart-btn ${isLiked ? 'liked' : ''}`} 
            onClick={handleLikeToggle} 
            aria-label="Toggle saved"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>

        <div className="card-details">
          <h3 className="card-title">{hotel.name}</h3>
          
          <div className="card-location">
            <svg className="pin-icon" viewBox="0 0 24 24" width="14" height="14">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{hotel.city}, {hotel.country}</span>
          </div>

          <div className="card-rating-row">
            {/* SCHEMA FIX: Added optional chaining and safe fallback since new DB records might start with 0 reviews */}
            <span className="star-score">★ {hotel.rating ? hotel.rating.toFixed(1) : 'New'}</span>
            <span className="review-count">({hotel.reviewCount || 0})</span>
          </div>

          <div className="card-price-row">
            <span className="price-prefix">From</span>
            <span className="price-amount">${hotel.pricePerNight}</span>
            <span className="price-suffix">/ night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;