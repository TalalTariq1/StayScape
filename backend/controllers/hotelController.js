const Hotel=require('../models/Hotel')
const User = require('../models/User');


const getAllHotels=async (req,res)=>{
    try{
        const {city,minPrice,maxPrice,starRating,amenities}=req.query
        const filter={}

        if(city){
            filter.city={ $regex: city, $options: 'i'}
        }

        if(minPrice|| maxPrice){
            filter.pricePerNight={}
            if (minPrice) filter.pricePerNight.$gte=Number(minPrice)
            if (maxPrice) filter.pricePerNight.$lte=Number(maxPrice)
        }

        if(starRating){
            const ratings=starRating.split(',').map(Number)
            filter.starRating={$in:ratings}
        }

        if(amenities){
            const amenityList=amenities.split(',')
            filter.amenities={$all:amenityList}
        }

        const hotels=await Hotel.find(filter).select("-reviews")

        res.status(200).json({hotels})
    }catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const getHotelById=async(req,res)=>{
    try{
        const hotel=await Hotel.findById(req.params.id)
        if(!hotel){
            return res.status(404).json({
                message:"Hotel Not Found"
            })

        }

        res.status(200).json({hotel})
    }catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}











const addReview=async (req,res)=>{
    try{
        const hotelId=req.params.id
        const {rating,comment}=req.body
        const userId=req.user.id
        const verifieduser=await User.findById(userId)
        if (!verifieduser) {
    return res.status(404).json({ message: "User profile not found" });
            }
            const name = verifieduser.fullname;


        if(!name || !rating || !comment){
             return res.status(400).json({
                message:"Rating,Comment and Name are required"
            })

        }
        const hotel=await Hotel.findById(hotelId)
        if(!hotel){
            return res.status(404).json({ message: "Hotel not found" });
        }

        const newReview={
            userId,
            name,
            rating:Number(rating),
            comment
        }

        hotel.reviews.push(newReview)

        hotel.reviewCount=hotel.reviews.length
        const totalRatingSum=hotel.reviews.reduce((sum,item)=>item.rating+sum,0)
        hotel.rating=Number((totalRatingSum/hotel.reviewCount).toFixed(1))

        await hotel.save()

        res.status(201).json({
            status:"Success",
            message:"Review added successfully",
            averageRating:hotel.rating,
            reviewCount:hotel.reviewCount,
            data:hotel.reviews
        })

    }catch(error){
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
}


module.exports = { 
  getAllHotels, 
  getHotelById, 
  addReview 
};



