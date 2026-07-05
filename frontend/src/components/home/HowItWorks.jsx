import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      stepLabel: 'STEP 1',
      title: 'Find your destination',
      description: 'Find hotels and experiences that match your trip.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="step-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      id: 2,
      stepLabel: 'STEP 2',
      title: 'Secure your booking',
      description: 'Book with confidence through our secure platform.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="step-icon">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
        </svg>
      )
    },
    {
      id: 3,
      stepLabel: 'STEP 3',
      title: 'Pack and go',
      description: 'Receive your itinerary and get ready for adventure.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="step-icon">
          <rect x="5" y="7" width="14" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        
        {/* Section Title Header */}
        <div className="how-it-works-header">
          <h2 className="section-main-title">How It Works</h2>
          <p className="section-sub-title">Book your perfect trip in three simple steps.</p>
        </div>

        {/* 3-Step Content Grid Layout */}
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="icon-circle-wrapper">
                {step.icon}
              </div>
              <span className="step-number-label">{step.stepLabel}</span>
              <h3 className="step-card-title">{step.title}</h3>
              <p className="step-card-description">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;