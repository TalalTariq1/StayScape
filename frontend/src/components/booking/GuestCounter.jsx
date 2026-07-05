import React from 'react';
import './GuestCounter.css';

const GuestCounter = ({ adults, children, onAdultsChange, onChildrenChange }) => {
  return (
    <div className="guest-counter-frame">
      {/* Adults Row */}
      <div className="counter-row">
        <div className="counter-label-block">
          <span className="counter-title">Adults</span>
          <span className="counter-subtitle">Ages 13 or above</span>
        </div>
        <div className="counter-stepper-controls">
          <button 
            type="button" 
            className="stepper-btn" 
            disabled={adults <= 1} 
            onClick={() => onAdultsChange(adults - 1)}
          >
            −
          </button>
          <span className="counter-numeric-value">{adults}</span>
          <button 
            type="button" 
            className="stepper-btn" 
            onClick={() => onAdultsChange(adults + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Children Row */}
      <div className="counter-row">
        <div className="counter-label-block">
          <span className="counter-title">Children</span>
          <span className="counter-subtitle">Ages 2–12</span>
        </div>
        <div className="counter-stepper-controls">
          <button 
            type="button" 
            className="stepper-btn" 
            disabled={children <= 0} 
            onClick={() => onChildrenChange(children - 1)}
          >
            −
          </button>
          <span className="counter-numeric-value">{children}</span>
          <button 
            type="button" 
            className="stepper-btn" 
            onClick={() => onChildrenChange(children + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestCounter;