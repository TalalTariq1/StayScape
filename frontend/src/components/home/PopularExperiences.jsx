import React from 'react';
import './PopularExperiences.css';

const PopularExperiences = () => {
  const experiences = [
    {
      id: 1,
      title: 'Sunset Desert Safari',
      location: 'Dubai, UAE',
      duration: '4 hours',
      rating: 4.9,
      price: 85,
      category: 'Adventure',
      categoryClass: 'badge-adventure',
      image: 'https://images.unsplash.com/photo-1546412414-e188526159bc?auto=format&fit=crop&w=600&q=100'
    },
    {
      id: 2,
      title: 'Old City Walking Tour',
      location: 'Istanbul, Turkey',
      duration: '3 hours',
      rating: 4.8,
      price: 45,
      category: 'Cultural',
      categoryClass: 'badge-cultural',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=100'
    },
    {
      id: 3,
      title: 'Traditional Balinese Cooking',
      location: 'Bali, Indonesia',
      duration: '5 hours',
      rating: 4.9,
      price: 65,
      category: 'Food Tour',
      categoryClass: 'badge-food',
      image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=100'
    }
  ];

  return (
    <section className="experiences-section" id="experiences">
      <div className="experiences-container">
        
        {/* Section Header Row */}
        <div className="experiences-header">
          <div className="header-left">
            <h2 className="experiences-title">Popular Experiences</h2>
            <p className="experiences-subtitle">Unforgettable things to do, curated for you.</p>
          </div>
          <a href="/experiences" className="view-all-link">
            View All
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        {/* Responsive Grid */}
        <div className="experiences-grid">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-card">
              
              {/* Image Container with Badges */}
              <div className="exp-image-container">
                <img src={exp.image} alt={exp.title} className="exp-img" loading="lazy" />
                <span className={`exp-badge ${exp.categoryClass}`}>{exp.category}</span>
              </div>

              {/* Text Info Block */}
              <div className="exp-info">
                <h3 className="exp-title">{exp.title}</h3>
                
                <div className="exp-meta-row">
                  <span className="exp-location">
                    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {exp.location}
                  </span>
                </div>

                <div className="exp-metrics-row">
                  <span className="exp-duration">
                    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {exp.duration}
                  </span>
                  <span className="exp-rating">
                    <span className="star-icon">★</span>
                    <span className="rating-num">{exp.rating}</span>
                  </span>
                </div>

                <div className="exp-price-row">
                  <span className="price-bold">From ${exp.price}</span>
                  <span className="price-label"> / person</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularExperiences;