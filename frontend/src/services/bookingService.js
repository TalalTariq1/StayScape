// src/services/bookingService.js
import API from '../api/axios';



export const createBooking = async (bookingData) => {
  try {
    const response = await API.post('/bookings',bookingData);
    return response.data; // Returns the { success: true, booking } payload from the server
  } catch (error) {
    console.error("Error creating live reservation entry:", error);
    throw error;
  }
};
export const getMyBookings = async () => {
  try {
    const response = await API.get('/bookings/my');
    return response.data; // Returns the wrapped data object containing your MongoDB records
  } catch (error) {
    console.error("Error fetching account dashboard summaries:", error);
    throw error;
  }
};
export const getBookingById = async (id) => {
  try {
    const response = await API.get(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error loading single reservation details for target ID ${id}:`, error);
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await API.patch(`/bookings/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error performing cancellation routine on document asset ${id}:`, error);
    throw error;
  }
};