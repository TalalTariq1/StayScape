const Booking = require('../models/Booking')
const Hotel = require('../models/Hotel')

const createBooking = async (req, res) => {
    try {
        const { hotelId, roomId, checkInDate, checkOutDate, adults, children, firstName, lastName, email, phone, specialRequests } = req.body
        console.log("Frontend sent Room ID:", roomId);
        if (!hotelId || !roomId || !checkInDate || !checkOutDate || !adults || !firstName || !lastName || !email || !phone) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (isNaN(checkIn) || isNaN(checkOut)) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        if (checkOut <= checkIn) {
            return res.status(400).json({ message: 'Check-out date must be after check-in date' });
        }

        const hotel = await Hotel.findById(hotelId)
        if (!hotel) {
            return res.status(404).json({
                message: "Hotel not found"
            })
        }
        console.log("Available Room IDs in this hotel:", hotel?.rooms.map(r => r._id.toString()));

        const room = hotel.rooms.id(roomId)
        if (!room) {
            return res.status(404).json({
                message: "room not found"
            })

        }

        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const serviceFee = Math.round(room.price * nights * 0.1);
        const totalPrice = room.price * nights + serviceFee;

        const booking =await Booking.create({
            userId: req.user.id,
            hotelId: hotel._id,
            room: {
                type: room.type,
                price: room.price,
                beds: room.beds,
                capacity: room.capacity
            },
            checkInDate: checkIn,
            checkOutDate: checkOut,
            adults,
            children: children || 0,
            firstName,
            lastName,
            email,
            phone,
            specialRequests: specialRequests || '',
            nights,
            serviceFee,
            totalPrice,
            status: 'upcoming'
        })

        res.status(201).json({ booking });


    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });

    }
}


const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate('hotelId', 'name city country images')
            .sort({ createdAt: -1 })

        res.status(200).json({ bookings })


    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)

    }
}

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('hotelId', 'name city country images')

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.userId.toString() != req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this booking' });
        }

        res.status(200).json({ booking });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        if(booking.status!=='upcoming'){
            return res.status(400).json({ message: `Cannot cancel a booking that is already ${booking.status}` });
        }

        booking.status='cancelled'
        await booking.save()

        res.status(200).json({ message: 'Booking cancelled successfully', booking });

    } catch (err) {
         res.status(500).json({ message: 'Server error', error: err.message });

    }
}

module.exports={cancelBooking,getMyBookings,getBookingById,createBooking}