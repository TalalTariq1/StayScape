import React, { useState, useEffect } from 'react';
import './HotelFilters.css';

const HotelFilters = ({ currentFilters, onApplyFilters, onClearFilters }) => {
  // Temporary component stage values
  const [minPrice, setMinPrice] = useState(currentFilters.priceRange.min);
  const [maxPrice, setMaxPrice] = useState(currentFilters.priceRange.max);
  const [stars, setStars] = useState(currentFilters.starRatings);
  const [amenities, setAmenities] = useState(currentFilters.amenities);

  // Sync state variables if modifications happen via 'Clear All'
  useEffect(() => {
    setMinPrice(currentFilters.priceRange.min);
    setMaxPrice(currentFilters.priceRange.max);
    setStars(currentFilters.starRatings);
    setAmenities(currentFilters.amenities);
  }, [currentFilters]);

  const handleStarToggle = (rating) => {
    setStars(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const handleAmenityToggle = (amenityId) => {
    setAmenities(prev => 
      prev.includes(amenityId) ? prev.filter(a => a !== amenityId) : [...prev, amenityId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters({
      priceRange: { min: Number(minPrice) || 0, max: Number(maxPrice) || 9999 },
      starRatings: stars,
      amenities: amenities // Sends consistent keys for the backend/frontend string parsing pipeline
    });
  };

  return (
    <aside className="filters-sidebar">
      <div className="filters-header">
        <h2 className="filters-title">Filters</h2>
        <button type="button" className="clear-all-link" onClick={onClearFilters}>
          Clear all
        </button>
      </div>

      <form onSubmit={handleSubmit} className="filters-form">
        {/* Price Range Filter Inputs */}
        <div className="filter-section">
          <h3 className="section-title">Price range</h3>
          <div className="price-inputs-row">
            <div className="price-field">
              <label>Min ($)</label>
              <input 
                type="number" 
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)} 
                placeholder="0"
              />
            </div>
            <div className="price-field">
              <label>Max ($)</label>
              <input 
                type="number" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)} 
                placeholder="1000"
              />
            </div>
          </div>
        </div>

        {/* Star Rating Group Component */}
        <div className="filter-section">
          <h3 className="section-title">Star rating</h3>
          <div className="checkbox-group">
            {[5, 4, 3, 2].map(rating => (
              <label key={rating} className="checkbox-label">
                <input 
                  type="checkbox"
                  checked={stars.includes(rating)}
                  onChange={() => handleStarToggle(rating)}
                />
                <span className="custom-check"></span>
                <span className="label-text">{rating} Stars</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities section matching search keys safely */}
        <div className="filter-section">
          <h3 className="section-title">Amenities</h3>
          <div className="checkbox-group">
            {[
              { id: 'wifi', label: 'Free WiFi' },
              { id: 'pool', label: 'Pool' },
              { id: 'parking', label: 'Parking' },
              { id: 'breakfast', label: 'Breakfast included' },
              { id: 'pets', label: 'Pet friendly' }
            ].map(item => (
              <label key={item.id} className="checkbox-label">
                <input 
                  type="checkbox"
                  checked={amenities.includes(item.id)}
                  onChange={() => handleAmenityToggle(item.id)}
                />
                <span className="custom-check"></span>
                <span className="label-text">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="apply-filters-btn">
          Apply filters
        </button>
      </form>
    </aside>
  );
};

export default HotelFilters;