const mongoose=require('mongoose')


const reviewSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})

const roomSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    beds:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String
    },
})

const hotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    country:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true
    },
    pricePerNight:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    reviewCount:{
        type:Number,
        default:0
    },
    amenities:{
        type:[String],
        default:[]
    },
    images:{
        type:[String],
        default:[]
    },
    badge:{
        type:String,
        default:null
    },
    starRating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    rooms:[roomSchema],
    reviews:[reviewSchema],
    isActive: {
  type: Boolean,
  default: true
  }
},{timestamps:true})

module.exports=mongoose.model('Hotel',hotelSchema)