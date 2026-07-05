const mongoose = require('mongoose');
require('dotenv').config();

const Hotel = require('./models/Hotel');

const hotels = [
  {
    name: 'Pearl Continental Hotel Karachi',
    city: 'Karachi',
    country: 'Pakistan',
    address: 'Club Road, Civil Lines, Karachi',
    description: 'An iconic 5-star landmark in the heart of Karachi offering world-class hospitality, fine dining restaurants, a rooftop pool, and state-of-the-art business facilities. Perfectly located for both corporate and leisure travelers seeking premium comfort in the city.',
    pricePerNight: 180,
    starRating: 5,
    rating: 4.8,
    reviewCount: 124,
    badge: 'Top Rated',
    amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Free Parking', 'Restaurant', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Deluxe King Room', beds: '1 King Bed', capacity: 2, price: 180, size: '40 sq m' },
      { type: 'Executive Suite', beds: '1 King Bed', capacity: 2, price: 280, size: '65 sq m' },
      { type: 'Family Room', beds: '2 Queen Beds', capacity: 4, price: 320, size: '75 sq m' }
    ]
  },
  {
    name: 'Serena Hotel Islamabad',
    city: 'Islamabad',
    country: 'Pakistan',
    address: 'Khayaban-e-Suhrawardy, Islamabad',
    description: 'Nestled amidst lush green gardens in the diplomatic enclave of Islamabad, Serena Hotel offers a tranquil escape with elegant rooms, award-winning cuisine, and impeccable service. A preferred choice for diplomats, business executives, and discerning travelers.',
    pricePerNight: 220,
    starRating: 5,
    rating: 4.9,
    reviewCount: 98,
    badge: 'Best Seller',
    amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Free Parking', 'Restaurant', 'Airport Shuttle'],
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Superior Room', beds: '1 King Bed', capacity: 2, price: 220, size: '38 sq m' },
      { type: 'Deluxe Room', beds: '1 King Bed', capacity: 2, price: 290, size: '48 sq m' },
      { type: 'Presidential Suite', beds: '1 Ultra King Bed', capacity: 2, price: 650, size: '120 sq m' }
    ]
  },
  {
    name: 'Avari Towers Karachi',
    city: 'Karachi',
    country: 'Pakistan',
    address: 'Fatima Jinnah Road, Karachi',
    description: 'A landmark luxury high-rise hotel in Karachi offering breathtaking city views, premium suites, and a rooftop pool. Avari Towers combines modern elegance with warm Pakistani hospitality, making it a top choice for business and leisure guests alike.',
    pricePerNight: 160,
    starRating: 5,
    rating: 4.7,
    reviewCount: 87,
    badge: 'Prime Location',
    amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Restaurant', 'Room Service', 'Business Center'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'City View Room', beds: '1 King Bed', capacity: 2, price: 160, size: '36 sq m' },
      { type: 'Tower Suite', beds: '1 King Bed', capacity: 2, price: 260, size: '58 sq m' },
      { type: 'Penthouse Suite', beds: '1 Ultra King Bed', capacity: 3, price: 480, size: '95 sq m' }
    ]
  },
  {
    name: 'Mövenpick Hotel Karachi',
    city: 'Karachi',
    country: 'Pakistan',
    address: 'Club Road, Civil Lines, Karachi',
    description: 'A premium international 5-star hotel in Karachi\'s business district offering 407 sophisticated rooms, multiple fine-dining venues including Lebanese and Pakistani cuisines, extensive banquet facilities, and a dedicated health club. Ideal for business elites and premium leisure travelers.',
    pricePerNight: 165,
    starRating: 5,
    rating: 4.6,
    reviewCount: 203,
    badge: 'Luxury',
    amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Free Parking', 'Restaurant', 'Airport Shuttle', 'Spa'],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Classic Room', beds: '1 King Bed', capacity: 2, price: 165, size: '35 sq m' },
      { type: 'Executive Room', beds: '1 King Bed', capacity: 2, price: 220, size: '45 sq m' },
      { type: 'Junior Suite', beds: '1 King Bed', capacity: 2, price: 340, size: '68 sq m' }
    ]
  },
  {
    name: 'Lahore Marriott Hotel',
    city: 'Lahore',
    country: 'Pakistan',
    address: 'Shahrah-e-Quaid-e-Azam, Mall Road, Lahore',
    description: 'Located on the prestigious Mall Road, Lahore Marriott is a historic luxury hotel blending colonial architecture with modern amenities. Enjoy world-class dining, a full-service spa, and elegant rooms that offer a perfect base to explore the cultural capital of Pakistan.',
    pricePerNight: 195,
    starRating: 5,
    rating: 4.8,
    reviewCount: 156,
    badge: 'Historic Charm',
    amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Free Parking', 'Restaurant', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Deluxe Room', beds: '1 King Bed', capacity: 2, price: 195, size: '42 sq m' },
      { type: 'Club Room', beds: '1 King Bed', capacity: 2, price: 270, size: '52 sq m' },
      { type: 'Suite', beds: '1 King Bed', capacity: 3, price: 420, size: '85 sq m' }
    ]
  },
  {
    name: 'PC Bhurban Murree',
    city: 'Murree',
    country: 'Pakistan',
    address: 'Bhurban Road, Murree, Punjab',
    description: 'Perched at 5,000 feet above sea level amidst pine forests, PC Bhurban is Pakistan\'s most stunning mountain resort. Offering panoramic Himalayan views, a championship golf course, and cozy fireside lounges, it is the ultimate highland escape for families and couples.',
    pricePerNight: 250,
    starRating: 5,
    rating: 4.9,
    reviewCount: 312,
    badge: 'Mountain Retreat',
    amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Free Parking', 'Restaurant', 'Golf Course'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Mountain View Room', beds: '1 King Bed', capacity: 2, price: 250, size: '40 sq m' },
      { type: 'Forest Suite', beds: '1 King Bed', capacity: 2, price: 380, size: '70 sq m' },
      { type: 'Presidential Chalet', beds: '2 King Beds', capacity: 4, price: 650, size: '130 sq m' }
    ]
  },
  {
    name: 'Islamabad Marriott Hotel',
    city: 'Islamabad',
    country: 'Pakistan',
    address: 'Aga Khan Road, Shalimar 5, Islamabad',
    description: 'The Islamabad Marriott is a premier luxury hotel offering elegant accommodations, a stunning outdoor pool, multiple signature restaurants, and world-class conference facilities. Situated in the heart of the federal capital, it serves as the perfect base for diplomats and business travelers.',
    pricePerNight: 200,
    starRating: 5,
    rating: 4.7,
    reviewCount: 89,
    badge: 'Business Pick',
    amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Free Parking', 'Restaurant', 'Business Center'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Deluxe King', beds: '1 King Bed', capacity: 2, price: 200, size: '38 sq m' },
      { type: 'Executive King', beds: '1 King Bed', capacity: 2, price: 280, size: '50 sq m' },
      { type: 'Ambassador Suite', beds: '1 King Bed', capacity: 2, price: 550, size: '100 sq m' }
    ]
  },
  {
    name: 'Avari Hotel Lahore',
    city: 'Lahore',
    country: 'Pakistan',
    address: '87 Shahrah-e-Quaid-e-Azam, Lahore',
    description: 'A classic luxury hotel in the cultural heart of Lahore, Avari Hotel offers timeless elegance with modern comforts. Steps away from the iconic Mall Road, it features multiple dining options, a beautiful outdoor pool, and attentive service that has defined Pakistani hospitality for decades.',
    pricePerNight: 145,
    starRating: 4,
    rating: 4.5,
    reviewCount: 178,
    badge: null,
    amenities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Free Parking', 'Restaurant', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Standard Room', beds: '1 Queen Bed', capacity: 2, price: 145, size: '32 sq m' },
      { type: 'Deluxe Room', beds: '1 King Bed', capacity: 2, price: 195, size: '42 sq m' },
      { type: 'Executive Suite', beds: '1 King Bed', capacity: 3, price: 320, size: '72 sq m' }
    ]
  },
  {
    name: 'Faletti\'s Hotel Lahore',
    city: 'Lahore',
    country: 'Pakistan',
    address: 'Egerton Road, Lahore',
    description: 'Established in 1880, Faletti\'s is Pakistan\'s most historic hotel, a colonial-era gem that has hosted royalty, world leaders, and literary legends. Its heritage architecture, lush gardens, and timeless charm make it a unique experience for travelers who appreciate history and elegance.',
    pricePerNight: 130,
    starRating: 4,
    rating: 4.4,
    reviewCount: 234,
    badge: 'Heritage Hotel',
    amenities: ['Free WiFi', 'Swimming Pool', 'Free Parking', 'Restaurant', 'Room Service', 'Garden'],
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Heritage Room', beds: '1 Queen Bed', capacity: 2, price: 130, size: '35 sq m' },
      { type: 'Garden Suite', beds: '1 King Bed', capacity: 2, price: 210, size: '60 sq m' },
      { type: 'Royal Suite', beds: '1 King Bed', capacity: 3, price: 380, size: '90 sq m' }
    ]
  },
  {
    name: 'Shelton\'s Rezidor Islamabad',
    city: 'Islamabad',
    country: 'Pakistan',
    address: 'Nazimuddin Road, F-7/4, Islamabad',
    description: 'A modern boutique luxury hotel in Islamabad\'s prestigious F-7 sector, Shelton\'s Rezidor offers intimate and personalized service with stylish contemporary rooms, a rooftop restaurant with stunning Margalla Hills views, and easy access to the city\'s top embassies and shopping districts.',
    pricePerNight: 110,
    starRating: 4,
    rating: 4.3,
    reviewCount: 67,
    badge: 'Boutique Stay',
    amenities: ['Free WiFi', 'Gym', 'Free Parking', 'Restaurant', 'Room Service', 'Rooftop Lounge'],
    images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'],
    isActive: true,
    rooms: [
      { type: 'Comfort Room', beds: '1 Queen Bed', capacity: 2, price: 110, size: '30 sq m' },
      { type: 'Superior Room', beds: '1 King Bed', capacity: 2, price: 155, size: '40 sq m' },
      { type: 'Rooftop Suite', beds: '1 King Bed', capacity: 2, price: 260, size: '65 sq m' }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing hotels
    await Hotel.deleteMany({});
    console.log('Existing hotels cleared');

    // Insert new hotels
    const inserted = await Hotel.insertMany(hotels);
    console.log(`${inserted.length} hotels seeded successfully`);

    console.log('\nSeeded hotels:');
    inserted.forEach((h, i) => console.log(`  ${i + 1}. ${h.name} — ${h.city}`));

    mongoose.disconnect();
    console.log('\nDone. Database disconnected.');

  } catch (error) {
    console.error('Seeding failed:', error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedDB();