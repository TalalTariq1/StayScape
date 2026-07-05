import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from "../../assets/images/hero-background.jpg"; // Added for navigation
import './Hero.css';

const Hero = () => {
  const [searchValue, setSearchValue] = useState(''); // State to track input
  const navigate = useNavigate(); // Hook for navigation

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Navigates to /hotels?city=YourInput
      navigate(`/hotels?city=${encodeURIComponent(searchValue.trim())}`);
    } else {
      // If blank, just takes them to the hotels page with defaults
      navigate('/hotels');
    }
  };

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Dark overlay matching the warm tone shadow of the image */}
      <div className="hero-overlay"></div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Find your next stay in seconds</h1>
          <p className="hero-subtitle">
            Discover and book the best hotels and experiences around the world. Simple, fast, and reliable.
          </p>
          
          {/* Turned this wrapper into a form to handle submission nicely */}
          <form onSubmit={handleSearchSubmit} className="hero-search-wrapper">
            <div className="search-input-group">
              <svg 
                className="search-icon-pin" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input 
                type="text" 
                placeholder="Enter city (e.g. Karachi, Dubai, Bali)" 
                className="hero-search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} // Syncing input state
              />
            </div>
            
            {/* Round Arrow Button (type="submit" triggers the form action) */}
            <button type="submit" className="hero-search-btn">
              <svg 
                className="search-arrow-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;