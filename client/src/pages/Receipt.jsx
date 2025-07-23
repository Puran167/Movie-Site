import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Receipt = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [movie, setMovie] = useState(null);
  const receiptRef = useRef();

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await API.get(`/bookings/${bookingId}`);
        setBooking(res.data);

        const movieRes = await API.get(`/movies/${res.data.movieId}`);
        setMovie(movieRes.data);
      } catch (err) {
        console.error("Error loading receipt:", err);
      }
    };

    fetchReceipt();
  }, [bookingId]);

  useEffect(() => {
    if (booking && movie) {
      downloadPDF();
    }
  }, [booking, movie]);

  const downloadPDF = async () => {
    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, width - 20, height);
    pdf.save("MovieZone_Receipt.pdf");
  };

  if (!booking || !movie) return <p>Loading receipt...</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <div ref={receiptRef} className="mb-4 text-sm leading-relaxed">
        <h2 className="text-xl font-bold mb-4 text-center">🎟️ Booking Receipt</h2>
        <p><strong>Movie:</strong> {movie.title}</p>
        <p><strong>Show Time:</strong> {booking.showTime}</p>
        <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
        <p><strong>Amount Paid:</strong> ₹{booking.seats.length * 100}</p>
        <p><strong>Payment ID:</strong> {booking.paymentId}</p>
        <p><strong>Date:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
      </div>

      <button
        onClick={downloadPDF}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        📄 Download PDF
      </button>
    </div>
  );
};

export default Receipt;
