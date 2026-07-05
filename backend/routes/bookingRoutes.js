const express=require('express')
const { createBooking, getMyBookings, getBookingById, cancelBooking } = require('../controllers/bookingController')
const { verifyToken } = require('../middleware/auth')
const router=express.Router()



router.post('/',verifyToken,createBooking)
router.get('/my',verifyToken,getMyBookings)
router.get('/:id',verifyToken,getBookingById)
router.patch('/:id/cancel',verifyToken,cancelBooking)


module.exports=router