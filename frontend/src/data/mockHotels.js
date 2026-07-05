export const mockHotels = [
  {
    id: 1,
    name: "Desert Oasis Resort",
    city: "Dubai",
    country: "UAE",
    pricePerNight: 320,
    rating: 4.8,
    reviewCount: 210,
    starRating: 5,
    amenities: ["wifi", "pool", "parking"],
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
    address: "Al Qudra Road, Desert Dunes, Dubai, UAE",
    description: "Experience the pinnacle of luxury in the heart of the Arabian desert. The Desert Oasis Resort offers an unparalleled escape where modern minimalist architecture meets the rolling golden dunes of Dubai. Guests enjoy private infinity pools, world-class dining, and authentic desert experiences under the stars.",
    amenitiesList: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "pool", label: "Pool" },
      { icon: "parking", label: "Free parking" },
      { icon: "coffee", label: "Breakfast" },
      { icon: "ac", label: "AC" },
      { icon: "gym", label: "Gym" }
    ],
    rooms: [
      { id: 101, type: "Deluxe King Room", price: 280, beds: "1 Bed", capacity: 2, size: "35m²" },
      { id: 102, type: "Premium Suite", price: 320, beds: "1 King Bed", capacity: 3, size: "55m²" }
    ],
    reviews: [
      { id: 1, name: "Alexander Wright", rating: 5, comment: "An absolute dream stay. The service was impeccable and the views of the desert at sunset are something I will never forget." },
      { id: 2, name: "Elena Rodriguez", rating: 4, comment: "Stunning architecture and very clean rooms. The infinity pool was the highlight. A bit far from the city center, but that's what makes it quiet." }
    ]
  },
  {
    id: 2,
    name: "Burj Skyline Hotel",
    city: "Dubai",
    country: "UAE",
    pricePerNight: 260,
    rating: 4.6,
    reviewCount: 140,
    starRating: 4,
    amenities: ["wifi", "pool"],
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    badge: null,
    address: "Sheikh Zayed Road, Downtown Dubai, UAE",
    description: "Soar above the city in a high-rise sanctuary overlooking downtown Dubai. This modern architectural masterpiece places you right in the center of premium shopping, cultural districts, and culinary hotspots, complete with a spectacular rooftop view.",
    amenitiesList: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "pool", label: "Rooftop Pool" },
      { icon: "ac", label: "AC" },
      { icon: "gym", label: "Gym" }
    ],
    rooms: [
      { id: 201, type: "Standard Studio", price: 260, beds: "1 Queen Bed", capacity: 2, size: "30m²" },
      { id: 202, type: "Skyline Executive Suite", price: 340, beds: "1 King Bed", capacity: 2, size: "48m²" }
    ],
    reviews: [
      { id: 3, name: "Marcus V.", rating: 5, comment: "Unbelievable central city convenience. Waking up to the view of the skyline was breath-taking." },
      { id: 4, name: "Sophia L.", rating: 4, comment: "Very clean and futuristic. Service desk sorted out our reservations instantly." }
    ]
  },
  {
    id: 3,
    name: "Marina Bay Suites",
    city: "Dubai",
    country: "UAE",
    pricePerNight: 210,
    rating: 4.7,
    reviewCount: 98,
    starRating: 4,
    amenities: ["wifi", "parking", "breakfast"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    badge: "25% off",
    address: "Marina Waterfront Promenade, Dubai, UAE",
    description: "Overlooking the vibrant harbor, Marina Bay Suites combines breezy nautical charm with high-end luxury. Perfectly tailored for longer stays, each boutique apartment features premium layouts and rapid water taxi access.",
    amenitiesList: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "parking", label: "Free parking" },
      { icon: "coffee", label: "Breakfast Included" },
      { icon: "ac", label: "AC" }
    ],
    rooms: [
      { id: 301, type: "Waterfront Suite", price: 210, beds: "1 Double Bed", capacity: 2, size: "40m²" },
      { id: 302, type: "Grand Marina Master Room", price: 295, beds: "1 King Bed", capacity: 3, size: "60m²" }
    ],
    reviews: [
      { id: 5, name: "Daniel K.", rating: 5, comment: "Walking along the promenade at night right outside the lobby was spectacular." }
    ]
  },
  {
    id: 4,
    name: "The Pearl Continental",
    city: "Karachi",
    country: "Pakistan",
    pricePerNight: 140,
    rating: 4.5,
    reviewCount: 320,
    starRating: 5,
    amenities: ["wifi", "pool", "parking", "breakfast"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
    address: "Club Road, Civil Lines, Karachi, Pakistan",
    description: "A legendary landmark of hospitality in Pakistan's largest city. Combining timeless South Asian heritage with five-star corporate and leisure services, it provides rich executive dining rooms, safe secure compounds, and traditional banquet halls.",
    amenitiesList: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "pool", label: "Indoor Pool" },
      { icon: "parking", label: "Valet Parking" },
      { icon: "coffee", label: "Buffet Breakfast" },
      { icon: "ac", label: "AC" },
      { icon: "gym", label: "Health Club Gym" }
    ],
    rooms: [
      { id: 401, type: "Deluxe King Room", price: 140, beds: "1 King Bed", capacity: 2, size: "38m²" },
      { id: 402, type: "Executive Continental Suite", price: 220, beds: "1 Royal King Bed", capacity: 3, size: "72m²" }
    ],
    reviews: [
      { id: 6, name: "Zainab Ahmed", rating: 5, comment: "The breakfast buffet selection is massive and high quality. Always my go-to choice when staying in Karachi." },
      { id: 7, name: "Tariq Mahmood", rating: 4, comment: "Classic old-world luxury. Staff is incredibly attentive and well-mannered." }
    ]
  },
  {
    id: 5,
    name: "Clifton Beach Vista",
    city: "Karachi",
    country: "Pakistan",
    pricePerNight: 85,
    rating: 4.1,
    reviewCount: 64,
    starRating: 3,
    amenities: ["wifi", "parking", "pets"],
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
    badge: null,
    address: "Marine Promenade, Clifton Block 4, Karachi, Pakistan",
    description: "Enjoy fresh ocean cross-breezes and views of the Arabian Sea shoreline. This relaxed coastal property offers immediate access to the beach, local street food hubs, and popular cafes, making it great for budget-conscious explorers.",
    amenitiesList: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "parking", label: "Free parking" },
      { icon: "ac", label: "AC" },
      { icon: "pets", label: "Pet Friendly" }
    ],
    rooms: [
      { id: 501, type: "Standard Sea View", price: 85, beds: "1 Queen Bed", capacity: 2, size: "28m²" },
      { id: 502, type: "Ocean View Family Room", price: 130, beds: "2 Twin Beds", capacity: 4, size: "45m²" }
    ],
    reviews: [
      { id: 8, name: "Ali Raza", rating: 4, comment: "Simple, honest rooms with a great view of Clifton Beach. Excellent value for the price paid." }
    ]
  },
  {
    id: 6,
    name: "Bosphorus Grand Palace",
    city: "Istanbul",
    country: "Turkey",
    pricePerNight: 450,
    rating: 4.9,
    reviewCount: 185,
    starRating: 5,
    amenities: ["wifi", "pool", "breakfast", "pets"],
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
    address: "Ciragan Caddesi, Besiktas, Istanbul, Turkey",
    description: "A majestic Ottoman-era palace restyled into a world-class resort right on the edge of the historic Bosphorus Strait. Indulge in classic Turkish hammams, heated waterfront pools, and watch the ships cruise between Europe and Asia.",
    amenitiesList: [
      { icon: "wifi", label: "High-Speed WiFi" },
      { icon: "pool", label: "Infinity Pool" },
      { icon: "coffee", label: "Traditional Breakfast" },
      { icon: "ac", label: "AC" },
      { icon: "gym", label: "Gym & Spa" },
      { icon: "pets", label: "Pets Allowed" }
    ],
    rooms: [
      { id: 601, type: "Palace King Room", price: 450, beds: "1 King Bed", capacity: 2, size: "42m²" },
      { id: 602, type: "Bosphorus Signature Suite", price: 680, beds: "1 Grand King Bed", capacity: 3, size: "85m²" }
    ],
    reviews: [
      { id: 9, name: "Charlotte K.", rating: 5, comment: "Staying here felt like stepping back into royal history. The spa treatment and hamam were unforgettable." },
      { id: 10, name: "Emre Demir", rating: 5, comment: "Flawless hospitality. Sitting out on the terrace overlooking the water at sunset is well worth the premium." }
    ]
  },
  {
    id: 7,
    name: "Galata Boutique Inn",
    city: "Istanbul",
    country: "Turkey",
    pricePerNight: 110,
    rating: 4.3,
    reviewCount: 92,
    starRating: 4,
    amenities: ["wifi", "breakfast"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
    badge: "15% off",
    address: "Beyoglu Neighborhood, Galata, Istanbul, Turkey",
    description: "Nestled away down cobblestone streets just steps from the historic Galata Tower. This intimate boutique getaway features authentic exposed brick accents, rustic design themes, and a charming rooftop terrace café.",
    amenitiesList: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "coffee", label: "Continental Breakfast" },
      { icon: "ac", label: "AC" }
    ],
    rooms: [
      { id: 701, type: "Cozy Double Room", price: 110, beds: "1 Double Bed", capacity: 2, size: "24m²" },
      { id: 702, type: "Boutique Attic Suite", price: 160, beds: "1 Queen Bed", capacity: 2, size: "32m²" }
    ],
    reviews: [
      { id: 11, name: "John Miller", rating: 4, comment: "Charming location close to all the local independent artisan coffee shops and boutiques. Very authentic stay." }
    ]
  },
  {
    id: 8,
    name: "Ubud Rainforest Villa",
    city: "Bali",
    country: "Indonesia",
    pricePerNight: 190,
    rating: 4.7,
    reviewCount: 412,
    starRating: 4,
    amenities: ["wifi", "pool", "parking", "pets"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
    address: "Jalan Raya Tegallalang, Ubud, Bali, Indonesia",
    description: "Immerse your senses in a private, tropical jungle escape. Ringed by emerald terraced rice paddies and deep valley ravines, this serene sanctuary features open-air stone showers, private plunge pools, and daily meditation decks.",
    amenitiesList: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "pool", label: "Plunge Pool" },
      { icon: "parking", label: "Free parking" },
      { icon: "ac", label: "AC" },
      { icon: "pets", label: "Pets Welcome" }
    ],
    rooms: [
      { id: 801, type: "Rainforest View Villa", price: 190, beds: "1 Canopy King Bed", capacity: 2, size: "65m²" },
      { id: 802, type: "Two-Bedroom Luxury Sanctuary", price: 310, beds: "2 King Beds", capacity: 4, size: "120m²" }
    ],
    reviews: [
      { id: 12, name: "Chloe Henderson", rating: 5, comment: "Pure magic. Waking up to the sounds of the tropical rainforest valley was therapeutic." },
      { id: 13, name: "Liam Thompson", rating: 4.5, comment: "Beautiful tropical layout. It is completely isolated and quiet, yet just a short scooter ride away from downtown Ubud." }
    ]
  },
  {
    id: 9,
    name: "Seminyak Beachfront Resort",
    city: "Bali",
    country: "Indonesia",
    pricePerNight: 280,
    rating: 4.6,
    reviewCount: 128,
    starRating: 5,
    amenities: ["wifi", "pool", "parking", "breakfast"],
    image: "https://images.unsplash.com/photo-1517840901100-8179e982ca41?auto=format&fit=crop&w=600&q=80",
    badge: null,
    address: "Jalan Petitenget, Seminyak, Bali, Indonesia",
    description: "Where upscale coastal elegance meets Bali's pristine beaches. Positioned right on the water, this luxury resort offers front-row seats to world-famous sunsets, beach club access, and elite modern dining venues.",
    amenitiesList: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "pool", label: "Oceanfront Pool" },
      { icon: "parking", label: "Free parking" },
      { icon: "coffee", label: "Floating Breakfast" },
      { icon: "ac", label: "AC" },
      { icon: "gym", label: "Fitness Gym" }
    ],
    rooms: [
      { id: 901, type: "Deluxe King Room", price: 280, beds: "1 King Bed", capacity: 2, size: "42m²" },
      { id: 902, type: "Oceanfront View Suite", price: 390, beds: "1 King Bed", capacity: 3, size: "68m²" }
    ],
    reviews: [
      { id: 14, name: "Yuki Tanaka", rating: 5, comment: "The floating pool breakfast experience was fantastic. Right next to the beach with amazing service." }
    ]
  }
];