// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth'); // Path to your auth middleware file
const { getDashboardAnalytics,createHotel,updateHotel,deleteHotel,addRoom, getAllHotels,getAllBookings,getBookingByIdAdmin } = require('../controllers/adminController');

// Secure this endpoint so only validated admin tokens can execute the database query
router.get('/dashboard-stats', verifyToken, verifyAdmin,getDashboardAnalytics);
router.get('/', verifyToken, verifyAdmin,getAllHotels);
router.post('/',verifyToken,verifyAdmin,createHotel)
router.put('/:id',verifyToken,verifyAdmin,updateHotel)
router.delete('/:id',verifyToken,verifyAdmin,deleteHotel)
//admin adding the route
router.post('/:id/rooms',verifyToken,verifyAdmin,addRoom)
router.get('/bookings', verifyToken, verifyAdmin, getAllBookings);
router.get('/bookings/:id', verifyToken, verifyAdmin, getBookingByIdAdmin)

module.exports = router;