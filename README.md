# 🎟️ Movie Zone - Ticket Booking App

Movie Zone is a full-stack web application for seamless movie ticket booking. Users can browse currently showing movies, select seats for a showtime, make payments securely using Razorpay, and download/view their booking receipt. Admins can manage listings and track bookings.

---

## 🚀 Features

### 👥 Authentication
- User login & registration
- Role-based dashboard (User/Admin)

### 🎬 Movie Listings
- Display all available movies
- Each movie has genre, duration, and poster
- Responsive card layout

### 🪑 Seat Booking
- Visual seat selection interface (🟩 Available, 🟥 Booked, 🟨 Selected)
- Real-time seat availability check
- Select multiple seats
- Showtimes for each movie

### 💳 Razorpay Payment Integration
- Real Razorpay checkout flow (test mode)
- After payment → booking confirmation

### 📥 Booking Receipt
- View all user bookings
- Receipt includes movie, showtime, seat numbers
- Admin can view all bookings
- (Optional) PDF download support

### 🔔 Notifications (optional)
- Booking status updates
- Approval/rejection if applicable

---

## 🛠️ Tech Stack

| Layer        | Tech                                   |
|--------------|----------------------------------------|
| Frontend     | React, React Router DOM, Axios, CSS    |
| Backend      | Node.js, Express                       |
| Database     | MongoDB (with Mongoose)                |
| Payment      | Razorpay SDK                           |
| Email (opt.) | Resend.com or Nodemailer               |
| Hosting      | Netlify (Frontend), Render (Backend)   |

---

## 🧪 Local Setup

1. **Clone this repo:**

git clone https://github.com/your-username/movie-zone.git
cd movie-zone

2. Install dependencies:

# In root directory
npm install

# In client/
cd client
npm install

3. Setup .env files

Create .env in server/:


MONGO_URI=your_mongodb_uri
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

4. Run the project:

# Backend
cd server
npm run dev

# Frontend
cd ../client
npm start
