<div align="center">

# 🏨 StayScape

### A full-stack hotel booking platform built with the MERN stack

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-black?style=for-the-badge)](https://stay-scape-zeta.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge)](https://stayscape-9jbl.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge)](https://stay-scape-zeta.vercel.app)

**StayScape** is a production-ready hotel booking web application that allows users to search, browse, and book hotels. It features a complete admin dashboard for managing hotel listings, viewing all platform bookings, and monitoring key business metrics — all built from scratch without any UI frameworks.

</div>

---

## 🔗 Live Demo

| | Link |
|--|------|
| 🌐 **Frontend** | [https://stay-scape-zeta.vercel.app](https://stay-scape-zeta.vercel.app) |
| ⚙️ **Backend API** | [https://stayscape-9jbl.onrender.com](https://stayscape-9jbl.onrender.com) |

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| 👤 Regular User | `user@stayscape.com` | `YOUR_DEMO_PASSWORD` |
| 🔐 Admin | `admin@stayscape.com` | `YOUR_ADMIN_PASSWORD` |

> ⚠️ The backend is hosted on Render's free tier and may take **30–60 seconds** to wake up after a period of inactivity. This is expected behavior on free hosting.

---

## ✨ Features

### 🧳 Guest (Public Access)
- Browse all hotel listings across Pakistan
- Search hotels by city or location
- Filter by price range and star rating
- View detailed hotel pages with image gallery, room options, amenities, and reviews
- Fully responsive across all screen sizes

### 👤 Registered User
- Secure signup and login with JWT authentication
- Select a room, enter guest details, and confirm a booking
- Live price calculation (nights × room price + service fee)
- Personal dashboard with upcoming and past bookings
- Cancel upcoming bookings directly from the dashboard
- View full booking summary with receipt breakdown
- Leave reviews on hotels after a stay

### 🔐 Admin
- Role-based access — admin panel hidden from regular users
- Overview dashboard with live stats: total hotels, total bookings, total revenue
- Add new hotel listings with full details, amenities, images, and rooms
- Edit existing hotel information
- Soft-delete hotels (preserves booking history integrity)
- Add new room configurations to existing hotels
- View all platform bookings with full guest and payment details

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 19 (Vite) | Component-based UI framework |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP client for API requests |
| Context API | Global authentication state |
| Plain CSS | Custom styling — no UI libraries |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | Schema modeling and ODM |
| JWT (jsonwebtoken) | Stateless authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin request handling |

### Deployment & Infrastructure
| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

## 📁 Project Structure

```
StayScape/
│
├── frontend/                        # React + Vite client application
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── axios.js             # Axios base instance with JWT interceptor
│       ├── assets/
│       │   └── images/              # Local static images (destinations etc.)
│       ├── components/
│       │   ├── admin/               # Admin layout and route protection
│       │   ├── auth/                # AuthModal, LogoutModal, ProtectedRoute
│       │   ├── home/                # Hero, FeaturedHotels, PopularDestinations etc.
│       │   ├── hotels/              # HotelCard, HotelFilters
│       │   └── shared/              # Navbar, Footer
│       ├── context/
│       │   └── AuthContext.jsx      # Global auth state (login, signup, logout)
│       ├── pages/
│       │   ├── admin/               # AdminOverview, AdminHotels, AdminBookings etc.
│       │   ├── Home.jsx
│       │   ├── Hotels.jsx
│       │   ├── HotelDetail.jsx
│       │   ├── Booking.jsx
│       │   ├── Dashboard.jsx
│       │   ├── BookingSummary.jsx
│       │   └── About.jsx
│       ├── services/                # API service layer (no direct axios in components)
│       │   ├── authService.js
│       │   ├── hotelService.js
│       │   ├── bookingService.js
│       │   └── adminService.js
│       ├── App.jsx
│       └── main.jsx
│
└── backend/                         # Node.js + Express REST API
    ├── config/
    │   └── db.js                    # MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   ├── hotelController.js
    │   ├── bookingController.js
    │   └── adminController.js
    ├── middleware/
    │   ├── authMiddleware.js        # JWT verification
    │   └── adminMiddleware.js       # Admin role check
    ├── models/
    │   ├── User.js
    │   ├── Hotel.js
    │   └── Booking.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── hotelRoutes.js
    │   ├── bookingRoutes.js
    │   └── adminRoutes.js
    ├── seed.js                      # Database seeder (10 Pakistani hotels)
    └── server.js                    # Express app entry point
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- npm v8+
- A MongoDB Atlas account and cluster

### 1. Clone the Repository

```bash
git clone https://github.com/TalalTariq1/StayScape.git
cd StayScape
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string/stayscape
JWT_SECRET=your_strong_jwt_secret_key
CLIENT_URL=http://localhost:5173
PORT=3000
```

Seed the database with 10 Pakistani hotels:

```bash
node seed.js
```

Start the development server:

```bash
npm run dev
```

✅ API running at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the development server:

```bash
npm run dev
```

✅ App running at `http://localhost:5173`

---

## 📡 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/signup` | Public | Register a new user |
| `POST` | `/login` | Public | Login — returns JWT + user object |

### Hotels — `/api/hotels`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get all hotels. Supports query params: `?city=Karachi&minPrice=100&maxPrice=500&starRating=4,5` |
| `GET` | `/:id` | Public | Get full hotel detail including rooms and reviews |
| `POST` | `/` | Admin | Create a new hotel listing |
| `PUT` | `/:id` | Admin | Update an existing hotel |
| `DELETE` | `/:id` | Admin | Soft-delete a hotel (sets `isActive: false`) |
| `POST` | `/:id/rooms` | Admin | Add a room configuration to a hotel |
| `POST` | `/:id/reviews` | Auth | Submit a guest review |

### Bookings — `/api/bookings`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/` | Auth | Create a booking. Sends `hotelId` + `roomId` — price calculated server-side |
| `GET` | `/my` | Auth | Get all bookings belonging to the logged-in user |
| `GET` | `/:id` | Auth | Get a single booking (ownership verified) |
| `PATCH` | `/:id/cancel` | Auth | Cancel an upcoming booking |

### Admin — `/api/admin`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/dashboard-stats` | Admin | Total hotels, bookings, users, and revenue |
| `GET` | `/` | Admin | Get all hotel listings including inactive |
| `GET` | `/bookings` | Admin | Get all platform bookings |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/stayscape` |
| `JWT_SECRET` | Secret key for signing tokens | `your_strong_random_secret` |
| `CLIENT_URL` | Allowed frontend origin for CORS | `https://stay-scape-zeta.vercel.app` |
| `PORT` | Server port | `3000` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://stayscape-9jbl.onrender.com/api` |

---

## 🏗️ Architecture & Design Decisions

### Service Layer Pattern
All API calls are abstracted into dedicated service files (`hotelService.js`, `bookingService.js`, `authService.js`, `adminService.js`). Components never call Axios directly. Each service function is `async` and shaped like a real API call, which meant that connecting the real backend to the frontend required changes only in the service files — zero UI component changes.

### Server-Side Price Calculation
When creating a booking, the client sends only `hotelId` and `roomId`. The server fetches the room price directly from the database and calculates the total. This prevents any client-side price manipulation.

### Embedded Documents
Hotel `rooms` and `reviews` are embedded directly inside the Hotel document rather than in separate collections. Since rooms and reviews are always needed when viewing a hotel, this eliminates extra database queries on the detail page.

### Soft Delete
Hotels are never permanently removed from the database. Setting `isActive: false` removes them from public listings while preserving the integrity of any existing booking records that reference the hotel.

### Role-Based Access Control
Two middleware layers protect admin routes — `authMiddleware` verifies the JWT token and `adminMiddleware` confirms the user's `isAdmin` flag in the database. Admin status is only granted manually in the database, never through the signup form.

---

## 👤 Author

**Talal Tariq**
- GitHub: [@TalalTariq1](https://github.com/TalalTariq1)
- Project: [StayScape](https://stay-scape-zeta.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Built with ❤️ using the MERN Stack
</div>
