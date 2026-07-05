import React from 'react';
import './CTA.css';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready to plan your next trip?</h2>
        <p className="cta-subtitle">
          Join thousands of travelers booking smarter with StayScape.
        </p>
        <Link to="/hotels" style={{ textDecoration: 'none' }}>
  <button className="cta-btn">Get Started</button>
</Link>
      </div>
    </section>
  );
};

export default CTA;