const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hotel',
        required:true
    },
    room:{
        type:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        beds:{
            type:String
        },
        capacity:{
            type:Number
        }

    },
    checkInDate:{
        type:Date,
        required:true
    },
    checkOutDate:{
        type:Date,
        required:true
    },

    adults:{
        type:Number,
        required:true,
        min:1
    },
    children:{
        type:Number,
        default:0
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    specialRequests:{
        type:String,
        default:''
    },
    totalPrice:{
        type:Number,
        required:true
    },
    serviceFee:{
        type:Number,
        required:true
    },
    nights:{
        type:Number,
        required:true
    },
    status:{
        type: String,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming'
    }



},{timestamps:true})

module.exports=mongoose.model('Booking',bookingSchema)