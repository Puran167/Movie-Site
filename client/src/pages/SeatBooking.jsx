import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import axios from "axios";
import "./SeatBooking.css"; 

const SeatBooking = () => {
  const { movieId, showTime } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingStatus, setBookingStatus] = useState("");

  const userId = localStorage.getItem("userId") || "dummyUser123";
  const seats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);

  useEffect(() => {
    const fetchMovieAndSeats = async () => {
      try {
        const movieRes = await API.get(`/movies/${movieId}`);
        setMovie(movieRes.data);

        const bookedRes = await API.get(
          `/movies/bookings/${movieId}/${encodeURIComponent(showTime)}`
        );
        setBookedSeats(bookedRes.data);
      } catch (err) {
        console.error("Error loading movie or booked seats:", err);
        setBookingStatus("❌ Failed to load data");
      }
    };

    fetchMovieAndSeats();
  }, [movieId, showTime]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePayment = async () => {
    const totalAmount = selectedSeats.length * 150;

    try {
      const orderRes = await axios.post("https://movie-site-j4c7.onrender.com", {
        amount: totalAmount * 100,
      });

      const { id: order_id, amount, currency } = orderRes.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_wJy9dw16r2kt9x",
        amount,
        currency,
        name: "MovieZone",
        description: "Movie Ticket Booking",
        order_id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post('https://movie-site-j4c7.onrender.com', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              selectedSeats,
              userId,
              movieId,
              showTime,
            });

            if (verifyRes.data.success) {
              alert("✅ Booking Confirmed!");
              navigate("/confirmation");
            } else {
              alert("❌ Booking failed after payment");
            }
          } catch (err) {
            alert("⚠️ Error verifying payment");
            console.error("Error verifying payment:", err.response?.data || err.message);
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("❌ Razorpay SDK not loaded");
      }

    } catch (err) {
      console.error("❌ Failed to initiate payment:", err.response?.data || err.message);
      setBookingStatus(`❌ Payment failed: ${err.response?.data?.message || err.message}`);
    }
  };

  if (!movie) return <p className="loading-message">Loading movie...</p>;

  return (
    <div className="seat-booking-container">
      <h2 className="movie-title">🎬 {movie.title}</h2>
      <p className="movie-meta">{movie.genre} • {movie.duration}</p>
      <p className="showtime">⏰ Showtime: <strong>{showTime}</strong></p>
      <img src={movie.poster} alt={movie.title} className="movie-poster" />

      <h3 className="select-seats-title">Select Your Seats</h3>

      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat}
            disabled={bookedSeats.includes(seat)}
            onClick={() => toggleSeat(seat)}
            className={`seat ${
              bookedSeats.includes(seat)
                ? 'booked'
                : selectedSeats.includes(seat)
                ? 'selected'
                : 'available'
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <div className="seat-status-key">
        <span><div className="seat-box available" /> Available</span>
        <span><div className="seat-box selected" /> Selected</span>
        <span><div className="seat-box booked" /> Booked</span>
      </div>

      <button
        onClick={handlePayment}
        disabled={selectedSeats.length === 0}
        className="pay-button"
      >
        💳 Pay & Book ({selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""})
      </button>

      {bookingStatus && <p className="error-message">{bookingStatus}</p>}
    </div>
  );
};

export default SeatBooking;
