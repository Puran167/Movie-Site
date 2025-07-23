import React, { useEffect, useState } from "react";
import API from "../api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState({});
  const userId = localStorage.getItem("userId") || "dummyUser123";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/bookings/user/${userId}`);
        setBookings(res.data);

        const movieMap = {};
        for (const b of res.data) {
          if (!movieMap[b.movieId]) {
            const movieRes = await API.get(`/movies/${b.movieId}`);
            movieMap[b.movieId] = movieRes.data;
          }
        }
        setMovies(movieMap);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchData();
  }, [userId]);

  const downloadReceipt = async (booking) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <h2>🎟️ Booking Receipt</h2>
      <p><strong>Movie:</strong> ${movies[booking.movieId]?.title}</p>
      <p><strong>Show Time:</strong> ${booking.showTime}</p>
      <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>
      <p><strong>Amount Paid:</strong> ₹${booking.seats.length * 100}</p>
      <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
      <p><strong>Date:</strong> ${new Date(booking.createdAt).toLocaleString()}</p>
    `;
    document.body.appendChild(element);
    const canvas = await html2canvas(element);
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
    pdf.save("receipt.pdf");
    document.body.removeChild(element);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 My Bookings</h2>
      {bookings.map((b) => (
        <div
          key={b._id}
          className="mb-4 p-4 bg-white rounded shadow border border-gray-200"
        >
          <p><strong>Movie:</strong> {movies[b.movieId]?.title || "Loading..."}</p>
          <p><strong>Show Time:</strong> {b.showTime}</p>
          <p><strong>Seats:</strong> {b.seats.join(", ")}</p>
          <p><strong>Payment ID:</strong> {b.paymentId}</p>
          <p><strong>Booked At:</strong> {new Date(b.createdAt).toLocaleString()}</p>
          <button
            onClick={() => downloadReceipt(b)}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
          >
            📄 Download Receipt
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
