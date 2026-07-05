import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllHotels } from '../services/hotelService';
import HotelFilters from '../components/hotels/HotelFilters';
import HotelCard from '../components/hotels/HotelCard';
import './Hotels.css';

const DEFAULT_FILTERS = {
  priceRange: { min: 0, max: 999999  },
  starRatings: [],
  amenities: []
};

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';

  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);
  
  const [locationInput, setLocationInput] = useState(urlCity);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  const [appliedSearch, setAppliedSearch] = useState({
    city: urlCity,
    guests: 1
  });

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6; 

  useEffect(() => {
    setLoading(true);
    getAllHotels()
      .then(res => {
        const arrayData = Array.isArray(res) 
          ? res 
          : (res.hotels || res.data || []);
          
        setAllHotels(arrayData);
        setFetchError('');
      })
      .catch(err => {
        setFetchError('Could not load properties. Please check your connection.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLocationInput(urlCity);
    setAppliedSearch(prev => ({ ...prev, city: urlCity }));
    setCurrentPage(1); 
  }, [urlCity]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedSearch({
      city: locationInput.trim(),
      guests: Number(guestCount)
    });
    setCurrentPage(1); 
  };

  // =========================================================================
  // FIXED REFACTORED FILTER ENGINE PIPELINE
  // =========================================================================
  const filteredHotels = allHotels.filter(hotel => {

    if (hotel.isActive === false) {
      return false;
    }

    // 1. Location match evaluation 
    if (appliedSearch.city && hotel.city?.toLowerCase() !== appliedSearch.city.toLowerCase()) {
      return false;
    }
    // 1. Location match evaluation 
    if (appliedSearch.city && hotel.city?.toLowerCase() !== appliedSearch.city.toLowerCase()) {
      return false;
    }

    // 2. Price bounds validation check
    const currentPrice = hotel.pricePerNight || hotel.price || 0;
    if (currentPrice < activeFilters.priceRange.min || currentPrice > activeFilters.priceRange.max) {
      return false;
    }

    // 3. Star rating checklist validation
    const currentRating = hotel.starRating || hotel.rating || 0;
    if (activeFilters.starRatings.length > 0 && !activeFilters.starRatings.includes(Math.floor(currentRating))) {
      return false;
    }

    // 4. FIXED: Substring, Partial-Word & Case-Insensitive Amenity Matcher
    if (activeFilters.amenities.length > 0) {
      // Normalize raw amenities data structure into consistent lowercase text arrays
      const hotelAmenitiesTextList = (hotel.amenitiesList || hotel.amenities || []).map(item => {
        const normalizedString = typeof item === 'object' ? (item.label || item.name || '') : item;
        return normalizedString.toLowerCase();
      });

      // Confirm every single checked filter passes partial word mapping conditions
      const containsAllSelected = activeFilters.amenities.every(filterKey => {
        return hotelAmenitiesTextList.some(amenityText => 
          amenityText.includes(filterKey.toLowerCase())
        );
      });

      if (!containsAllSelected) return false;
    }

    return true;
  });

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotelsSlice = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
  
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  return (
    <div className="listing-page-wrapper">
      
      <form className="search-ribbon-container" onSubmit={handleSearchSubmit}>
        <div className="search-ribbon">
          
          {/* Location Search Control Block */}
          <div className="search-input-field">
            <svg viewBox="0 0 24 24" width="16" height="16" className="input-icon">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div className="input-inner-stack">
              <label className="search-field-label">Location</label>
              {/* FIXED: Placeholder modified explicitly to reference city values */}
              <input 
                type="text" 
                value={locationInput} 
                onChange={(e) => setLocationInput(e.target.value)} 
                placeholder="Enter city (e.g. Karachi, Dubai)"
              />
            </div>
          </div>
          
          <div className="search-divider-line"></div>

          {/* Calendar Selector 1: Check In */}
          <div className="search-input-field">
            <svg viewBox="0 0 24 24" width="16" height="16" className="input-icon">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
            </svg>
            <div className="input-inner-stack">
              <label className="search-field-label">Check in</label>
              <input 
                type="date" 
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="native-date-input"
              />
            </div>
          </div>

          <div className="search-divider-line"></div>

          {/* Calendar Selector 2: Check Out */}
          <div className="search-input-field">
            <svg viewBox="0 0 24 24" width="16" height="16" className="input-icon">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
            </svg>
            <div className="input-inner-stack">
              <label className="search-field-label">Check out</label>
              <input 
                type="date" 
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="native-date-input"
                min={checkInDate || undefined}
              />
            </div>
          </div>

          <div className="search-divider-line"></div>

          {/* Guest Count Menu Trigger */}
          <div 
            className="search-input-field clickable-field" 
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" className="input-icon">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <div className="input-inner-stack">
              <label className="search-field-label">Guests</label>
              <span className="guest-display-text">{guestCount} {guestCount === 1 ? 'guest' : 'guests'}</span>
            </div>

            {isGuestDropdownOpen && (
              <div className="guest-picker-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="guest-picker-row">
                  <div className="guest-label-block">
                    <span className="guest-type-title">Guests</span>
                    <span className="guest-type-subtitle">Number of travelers</span>
                  </div>
                  <div className="guest-counter-controls">
                    <button 
                      type="button" 
                      className="counter-btn" 
                      disabled={guestCount <= 1}
                      onClick={() => setGuestCount(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="counter-value">{guestCount}</span>
                    <button 
                      type="button" 
                      className="counter-btn" 
                      onClick={() => setGuestCount(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="guest-close-action-btn"
                  onClick={() => setIsGuestDropdownOpen(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="search-ribbon-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ffffff" strokeWidth="3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search
          </button>
        </div>
      </form>

      {/* Main Workspace Layout Canvas Block */}
      <main className="listing-workspace">
        <HotelFilters 
          currentFilters={activeFilters}
          onApplyFilters={(nextFilters) => {
            setActiveFilters(nextFilters);
            setCurrentPage(1); 
          }}
          onClearFilters={() => {
            setActiveFilters(DEFAULT_FILTERS);
            setCurrentPage(1);
          }}
        />

        <section className="results-panel">
          {loading ? (
            <div className="loading-state-container">
              <p>Fetching amazing destinations...</p>
            </div>
          ) : fetchError ? (
            <div className="error-state-container">
              <p>{fetchError}</p>
            </div>
          ) : (
            <>
              <div className="results-meta-header">
                <h1 className="results-count-heading">
                  {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
                  {appliedSearch.city ? ` in ${appliedSearch.city}` : ' across all destinations'}
                </h1>
                
                <div className="sorting-selector-dropdown">
                  <span className="sort-label">Sort: Recommended</span>
                  <svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 10l5 5 5-5z"/></svg>
                </div>
              </div>

              {filteredHotels.length > 0 ? (
                <>
                  <div className="hotels-grid">
                    {currentHotelsSlice.map(hotel => (
                      <HotelCard key={hotel._id || hotel.id} hotel={hotel} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination-container">
                      <button 
                        className="pagination-arrow-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      >
                        &larr; Prev
                      </button>

                      <div className="pagination-numbers-group">
                        {Array.from({ length: totalPages }, (_, index) => {
                          const pageNum = index + 1;
                          return (
                            <button
                              key={pageNum}
                              className={`pagination-number-btn ${currentPage === pageNum ? 'active-page' : ''}`}
                              onClick={() => setCurrentPage(pageNum)}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button 
                        className="pagination-arrow-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      >
                        Next &rarr;
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-state-notice">
                  <div className="empty-state-icon">🏨</div>
                  <h2>No hotels match your search</h2>
                  <p>Try matching with cities from our database profiles like "Dubai", "Karachi", "Bali", or "Istanbul".</p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Hotels;