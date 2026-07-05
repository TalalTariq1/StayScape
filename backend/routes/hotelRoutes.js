const express=require('express')
const { getAllHotels, getHotelById, addReview} = require('../controllers/hotelController')
const { verifyToken, verifyAdmin } = require('../middleware/auth')
const router=express.Router()


//these are the user routes
router.get('/',getAllHotels)
router.get('/:id',getHotelById)
//user adding a review
router.post('/:id/reviews',verifyToken,addReview)



module.exports=router
