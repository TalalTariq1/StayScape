const express=require('express')
require('dotenv').config()
const connectDB=require('./config/db')
const authRoutes=require('./routes/authRoutes')
const hotelRoutes=require('./routes/hotelRoutes')
const bookingRoutes=require('./routes/bookingRoutes')
const adminRoutes = require('./routes/adminRoutes');
const cors=require('cors')


const app=express()
const PORT=process.env.PORT||3000

connectDB()

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials:true
}))


app.use(express.json())



app.use('/api/auth',authRoutes)
app.use('/api/hotels',hotelRoutes)
app.use('/api/bookings',bookingRoutes)
app.use('/api/admin', adminRoutes);


app.get("/",(req,res)=>{
    res.status(200).json({
        status:"Success",
        message:"The api is online now"
    })
})

app.listen(PORT,()=>{
    console.log(`The app is running on the port http://localhost:${PORT}`)
})