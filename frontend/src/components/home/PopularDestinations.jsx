import React from 'react';
import './PopularDestinations.css';

// Local imports — these never break regardless of deployment
import karachiImg from '../../assets/images/destinations/karachi.jpg';
import dubaiImg from '../../assets/images/destinations/dubai.jpg';
import istanbulImg from '../../assets/images/destinations/istanbul.jpg';
import baliImg from '../../assets/images/destinations/bali.jpg';

const PopularDestinations = () => {
  const destinations = [
    { id: 1, name: 'Karachi', image: karachiImg },
    { id: 2, name: 'Dubai',   image: dubaiImg   },
    { id: 3, name: 'Istanbul', image: istanbulImg },
    { id: 4, name: 'Bali',    image: baliImg    }
  ];

  return (
    <section className="destinations-section" id="destinations">
      <div className="destinations-container">
        
        <div className="destinations-header">
          <h2 className="destinations-title">Popular Destinations</h2>
          <p className="destinations-subtitle">Explore top cities loved by travelers.</p>
        </div>

        <div className="destinations-grid">
          {destinations.map((city) => (
            <div key={city.id} className="destination-card">
              <img 
                src={city.image} 
                alt={city.name} 
                className="destination-img" 
                loading="lazy"
              />
              <div className="destination-overlay"></div>
              <h3 className="destination-name">{city.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularDestinations;
