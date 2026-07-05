import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import RoomCard from '../components/hotel-detail/RoomCard';
import ReviewCard from '../components/hotel-detail/ReviewCard';
import BookingSidebar from '../components/hotel-detail/BookingSidebar';
import './HotelDetail.css';

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getHotelById(id)
      .then((res) => {
        // SCHEMA FIX: Unwrap the hotel document if it's nested inside a response wrapper object
        const hotelData = res && res.hotel ? res.hotel : res;

        if (hotelData) {
          setHotel(hotelData);
          
          // Pull initial fallback rooms safely from the database array
          const structuralRooms = hotelData.rooms || [];
          if (structuralRooms.length > 0) {
            setSelectedRoom(structuralRooms[0]);
          }
        }
      })
      .catch((err) => {
        console.error("Error loading hotel details profile:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="detail-loading">Loading hotel details...</div>;
  }

  if (!hotel) {
    return <div className="detail-loading">Hotel destination not found.</div>;
  }

  return (
    <div className="detail-container">
      {/* Breadcrumb Navigation */}
      <nav className="detail-breadcrumb">
        <Link to="/hotels" className="breadcrumb-link">Hotels</Link> 
        <span className="breadcrumb-separator">/</span> 
        <span className="breadcrumb-text">{hotel.city}</span> 
        <span className="breadcrumb-separator">/</span> 
        <span className="breadcrumb-text active">{hotel.name}</span>
      </nav>

      {/* Main Header Profile */}
      <header className="detail-header">
        <div className="detail-header-left">
          <h1 className="hotel-headline-name">{hotel.name}</h1>
          <div className="detail-meta-info">
            <span className="detail-rating">★ {hotel.rating ? hotel.rating.toFixed(1) : 'New'} ({hotel.reviewCount || 0} reviews)</span>
            <span className="detail-location-pin">📍 {hotel.address || hotel.location}</span>
          </div>
        </div>
        <button className="wishlist-btn" aria-label="Save to wishlist">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </header>

      {/* Full-width Hero Banner Image */}
      <div className="detail-hero-wrapper">
        <img 
          src={hotel.images?.[0] || hotel.image || 'https://via.placeholder.com/1200x500?text=No+Image+Available'} 
          alt={hotel.name} 
          className="detail-hero-img" 
        />
      </div>

      {/* Split Workspace Column Grid */}
      <div className="detail-layout-grid">
        
        {/* Left Side: Specific Content Inclusions */}
        <div className="detail-main-content">
          <section className="detail-section">
            <h2 className="section-headline-title">About this hotel</h2>
            <p className="detail-description-text">{hotel.description}</p>
          </section>

          <section className="detail-section">
            <h2 className="section-headline-title">Amenities</h2>
            <div className="detail-amenities-grid">
              {/* Fallback check: uses amenitiesList or directly handles an amenities array */}
              {(hotel.amenitiesList || hotel.amenities)?.map((item, index) => (
                <div key={index} className="amenity-pill-item">
                  <span className="amenity-label-text">{typeof item === 'object' ? item.label : item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h2 className="section-headline-title">Choose your room</h2>
            <div className="rooms-stack">
              {hotel.rooms?.map((room) => (
                <RoomCard 
                  key={room._id || room.id}
                  room={room}
                  /* DYNAMIC TRACKING FIX: Uses MongoDB structural identification keys cleanly */
                  isSelected={(selectedRoom?._id || selectedRoom?.id) === (room._id || room.id)}
                  onSelect={() => setSelectedRoom(room)}
                />
              ))}
            </div>
          </section>

          <section className="detail-section">
            <div className="reviews-heading-row">
              <h2 className="section-headline-title">Guest reviews</h2>
              <button className="reviews-view-all">See all reviews</button>
            </div>
            <div className="reviews-stack">
              {hotel.reviews?.map((review) => (
                <ReviewCard key={review._id || review.id} review={review} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Sticky Interactive Pricing Sidebar Context */}
        <aside className="detail-sidebar-column">
          <BookingSidebar hotel={hotel} selectedRoom={selectedRoom} />
        </aside>

      </div>
    </div>
  );
};

export default HotelDetail;