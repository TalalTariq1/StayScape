// controllers/adminController.js
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking'); 
const User = require('../models/User');// Adjust this path to match your booking model file name

const getDashboardAnalytics=async (req,res)=>{
    try{
        const [totalHotels,totalBookings,totalUsers,activeBookings]=await Promise.all([
            Hotel.countDocuments({}),
            Booking.countDocuments(),
            User.countDocuments({isAdmin:false}),
            Booking.find({status:{$ne:'cancelled'}})
        ])

        const totalRevenue=activeBookings.reduce((sum,booking)=>{
            return sum+(booking.totalPrice || 0)
        },0)

        const recentBookings=await Booking.find()
        .sort({createdAt:-1})
        .limit(5)
        .populate('userId','fullname email')
        .populate('hotelId', 'name city');

        res.status(200).json({
            success:true,
            metrics:{
                totalHotels,
                totalBookings,
                totalUsers,
                totalRevenue
            },
            recentBookings
        })
    }catch(error){
        res.status(500).json({
      success: false,
      message: 'Failed to aggregate administrative dashboard metrics.',
      error: error.message
        })
    }

}



const getAllHotels=async (req,res)=>{
    try{
        const hotels=await Hotel.find().sort({createdAt:-1})
        res.status(200).json({
            success:true,
            count:hotels.length,
            hotels
        })
    }catch(error){
        res.status(500).json({
            sucess:false,
            message:"Failed to fetch the comprehensive hotel database",
            error:error.message
        })
    }
}


const createHotel=async(req,res)=>{
    try{
        const {name,city,country,address,description,pricePerNight,amenities,images,badge,starRating,rooms}=req.body

        if(!name || !city || !country || !address || !description || !pricePerNight || !starRating){
            return res.status(400).json({
                message:"Please fill all the required fields"
            })
        }

        const hotel=await Hotel.create({
            name,city,country,address,description,pricePerNight,starRating,
            amenities:amenities||[],
            images:images||[],
            badge:badge||null,
            rooms:rooms||[]
        })

        res.status(201).json({hotel})
    }catch(err){
         res.status(500).json({ message: 'Server error', error: err.message });
    }



}



const updateHotel=async(req,res)=>{
    try{
        const updatedHotel=await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true,runValidators:true}
        )

        if(!updatedHotel){
            return res.status(404).json({
                message:"Hotel not found"
            })
        }

        res.status(200).json({
            status:"Success",
            data:updatedHotel
        })
    }catch(error){
        res.status(500).json({ message: "Error updating hotel", error: error.message });
    }
}



const deleteHotel=async (req,res)=>{
    try{
        const hotel=await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:{isActive:false}},
            {new:true}
        )
        if(!hotel){
            return res.status(404).json({
                message:"Hotel not found"
            })
        }

        res.status(200).json({
            status:"Sucess",
            message:"Hotel has been deleted sucessfully"
        })
    }catch(error){
        res.status(500).json({ message: "Error deleting hotel", error: error.message });
    }
}


const addRoom=async(req,res)=>{
    try{

        const hotelId=req.params.id
        const {type,beds,capacity,price,size}=req.body

        if(!type || !beds || !capacity || !price || !size){
            return res.status(400).json({
                message:"Please fill all the required fields for a room config"
            })
        }

        const newRoom={
            type,
            beds,
            capacity,
            price,
            size
        }

        const updatedHotel=await Hotel.findByIdAndUpdate(
            hotelId,
            {$push:{rooms:newRoom}},
            {new:true,runValidators:true}
        )

        if(!updatedHotel){
             return res.status(404).json({
                message:"Hotel not found"
            })
        }

        return res.status(201).json({
            status:"Sucess",
            message:"Room configuration added sucessfully",
            data:updatedHotel.rooms
        })
    }catch(error){
        res.status(500).json({ message: "Error adding room", error: error.message });
    }
}

const getAllBookings = async (req, res) => {
    try {
        // Fetch all bookings for the Admin
        const bookings = await Booking.find({})
            .populate('hotelId', 'name city')
            .sort({ createdAt: -1 });

        res.status(200).json({ bookings });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getBookingByIdAdmin = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('hotelId', 'name city country images');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ booking });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



module.exports={getDashboardAnalytics,createHotel, 
  updateHotel,
  deleteHotel,
  addRoom,
getAllHotels,
getAllBookings,
getBookingByIdAdmin}

