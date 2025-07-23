import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./MovieDetails.css"; 

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Failed to load movie details", err);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSeatBooking = (showTime) => {
    if (!movie?._id) return;
    const encodedTime = encodeURIComponent(showTime);
    navigate(`/book/${movie._id}/${encodedTime}`);
  };

  if (!movie) return <div className="movie-loading">Loading...</div>;

  return (
    <div className="movie-details-container">
      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-meta">{movie.genre} • {movie.duration}</p>

      <div className="showtimes-section">
        <h3 className="showtimes-title">Available Showtimes:</h3>
        <div className="showtimes-list">
          {["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"].map((time) => (
            <button
              key={time}
              onClick={() => handleSeatBooking(time)}
              className="showtime-button"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
