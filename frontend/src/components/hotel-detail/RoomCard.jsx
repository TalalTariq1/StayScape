import React from 'react';
import './SubComponents.css';

const RoomCard = ({ room, isSelected, onSelect }) => {
  return (
    <div 
      className={`room-selection-card ${isSelected ? 'active-selected' : ''}`}
      onClick={onSelect}
    >
      <div className="room-card-info">
        <div className="room-title-block">
          <h3>{room.type}</h3>
          <p className="room-specs">
            {room.beds} • Max {room.capacity} Guests • {room.size}
          </p>
        </div>
        <div className="room-pricing-block">
          <span className="room-card-rate">${room.price}</span>
          <span className="room-card-unit">/ night</span>
        </div>
      </div>
      
      {isSelected && (
        <div className="room-selected-indicator">
          <span className="selected-badge">✓ Currently Selected</span>
        </div>
      )}
    </div>
  );
};

export default RoomCard;