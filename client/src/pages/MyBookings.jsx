import React, { useEffect, useState } from "react";
import API from "../api";
import "./MyBookings.css"; 

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      API.get(`/bookings/user/${userId}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error(err));
    }
  }, [userId]);

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">🎟️ My Bookings</h2>
      {bookings.map((booking, i) => (
        <div key={i} className="booking-card">
          <p><strong>Movie ID:</strong> {booking.movieId}</p>
          <p><strong>Showtime:</strong> {booking.showTime}</p>
          <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
        </div>
      ))}
      {bookings.length === 0 && (
        <p className="no-bookings">No bookings yet.</p>
      )}
    </div>
  );
};

export default MyBookings;
