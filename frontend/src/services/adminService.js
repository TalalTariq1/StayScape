// src/services/adminService.js
import API from '../api/axios';

export const getAdminStats = async () => {
  try {
    const response = await API.get('/admin/dashboard-stats');
    return response.data;
  } catch (error) {
    console.error("Error fetching admin platform telemetry metrics:", error);
    throw error;
  }
};

// FETCH ALL HOTELS FOR MANAGEMENT GRID
export const getAdminHotels = async () => {
  try {
    const response = await API.get('/hotels'); // Or your dedicated /api/admin/hotels endpoint
    return response.data;
  } catch (error) {
    console.error("Error loading administrative hotel directory:", error);
    throw error;
  }
};

// DELETE A HOTEL SYSTEM ASSET
export const deleteAdminHotel = async (id) => {
  try {
    const response = await API.delete(`/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting hotel asset execution on ID ${id}:`, error);
    throw error;
  }
};

// src/services/adminService.js

export const updateAdminHotel = async (id, hotelData) => {
  try {
    // Corrected to match your backend route: /api/admin/:id
    const response = await API.put(`/admin/${id}`, hotelData); 
    return response.data; // Returns { success: true, hotel }
  } catch (error) {
    console.error(`Error updating hotel asset execution on ID ${id}:`, error);
    throw error;
  }
};



export const addAdminRoom = async (hotelId, roomData) => {
  try {
    // Correctly matches your backend route structure: /api/admin/:id/rooms
    const response = await API.post(`/admin/${hotelId}/rooms`, roomData);
    return response.data; // Returns whatever payload envelope your backend answers with
  } catch (error) {
    console.error(`Error adding room to hotel asset ID ${hotelId}:`, error);
    throw error;
  }
};


export const createAdminHotel = async (hotelData) => {
  try {
    // Hits exactly: POST /api/admin/
    // Since your backend mounts router.post('/', ...), we just pass an empty string or '/'
    const response = await API.post('/admin/', hotelData);
    return response.data;
  } catch (error) {
    console.error('Error creating platform hotel asset record:', error);
    throw error;
  }
};

export const getAllBookings = async () => {
    // Note: ensure your axios base URL or proxy includes /api/admin
    const response = await API.get('/admin/bookings'); 
    return response.data.bookings;
};


export const getAdminBookingById = async (id) => {
  try {
    const response = await API.get(`/admin/bookings/${id}`);
    return response.data; // Returns the booking object
  } catch (error) {
    console.error(`Error fetching admin booking details for ${id}:`, error);
    throw error;
  }
};