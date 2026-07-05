// src/pages/AdminAddRoom.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import { addAdminRoom } from '../services/adminService';
import './AdminAddRoom.css';

const AdminAddRoom = () => {
  const { id } = useParams(); // Extracts the hotel ID from the route parameter
  const navigate = useNavigate();
  
  const [hotelName, setHotelName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state tracking every field specified in your roomSchema
  const [roomForm, setRoomForm] = useState({
    type: '',
    beds: '',
    capacity: 1,
    price: 0,
    size: ''
  });

  // Fetch the target hotel's name on mount so the admin knows exactly which hotel they are modifying
 useEffect(() => {
  const fetchTargetHotel = async () => {
    try {
      const data = await getHotelById(id);
      
      // Air-tight check to unpack the hotel object no matter how your backend formats the response
      if (data) {
        const target = data.hotel || data;
        setHotelName(target.name || 'Selected Property');
      }
    } catch (err) {
      console.error("Error fetching hotel data:", err);
      setError('Failed to fetch parent hotel data asset.');
    } finally {
      // CRITICAL: This MUST run even if the backend returns weird data, 
      // so the page actually drops the loading screen and shows your form.
      setLoading(false);
    }
  };
  
  if (id) {
    fetchTargetHotel();
  }
}, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure capacity and price are converted to actual numeric values before going to the backend
    const finalValue = (name === 'capacity' || name === 'price') ? Number(value) : value;
    
    setRoomForm((prev) => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addAdminRoom(id, roomForm);
      alert(`Room successfully configured and added to "${hotelName}"!`);
      navigate('/admin/hotels'); // Redirect smoothly back to the inventory list
    } catch (err) {
      alert('Failed to save the room into the database array.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="admin-loading">Initializing room configuration workspace...</div>;
  if (error) return <div className="admin-error-banner">{error}</div>;

  return (
    <div className="room-workspace-container">
      <header className="room-workspace-header">
        <h1>Add New Room</h1>
        <p>Configuring space assets under: <strong>{hotelName}</strong></p>
      </header>

      <div className="room-form-card">
        <form onSubmit={handleSubmit}>
          
          {/* ROOM TYPE */}
          <div className="form-row-group">
            <label>ROOM CATEGORY TYPE</label>
            <input 
              type="text" 
              name="type" 
              value={roomForm.type} 
              onChange={handleInputChange} 
              placeholder="e.g. Deluxe Ocean View, Executive Suite"
              required 
            />
          </div>

          {/* BEDS */}
          <div className="form-row-group">
            <label>BED CONFIGURATION</label>
            <input 
              type="text" 
              name="beds" 
              value={roomForm.beds} 
              onChange={handleInputChange} 
              placeholder="e.g. 1 King Bed or 2 Twin Beds"
              required 
            />
          </div>

          {/* CAPACITY & SIZE SIDE-BY-SIDE GRID */}
          <div className="form-split-grid">
            <div className="form-row-group">
              <label>MAX GUEST CAPACITY</label>
              <input 
                type="number" 
                name="capacity" 
                value={roomForm.capacity} 
                onChange={handleInputChange} 
                min="1"
                required 
              />
            </div>

            <div className="form-row-group">
              <label>ROOM SIZE (Optional)</label>
              <input 
                type="text" 
                name="size" 
                value={roomForm.size} 
                onChange={handleInputChange} 
                placeholder="e.g. 450 sq ft / 42 sq m"
              />
            </div>
          </div>

          {/* PRICE INPUT */}
          <div className="form-row-group">
            <label>BASE PRICE PER NIGHT (ROOM SPECIFIC)</label>
            <div className="room-price-wrapper">
              <span>$</span>
              <input 
                type="number" 
                name="price" 
                value={roomForm.price} 
                onChange={handleInputChange} 
                min="0"
                required 
              />
            </div>
          </div>

          {/* WORKSPACE ACTIONS BUTTONS */}
          <div className="form-actions-footer">
            <button 
              type="button" 
              onClick={() => navigate('/admin/hotels')} 
              className="room-btn-cancel"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="room-btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Add Room'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminAddRoom;