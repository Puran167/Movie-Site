import React from "react";
import { Link } from "react-router-dom";
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <p>{movie.genre}</p>
        <p>{movie.duration}</p>
        <Link to={`/movies/${movie._id}`}>
          <button className="book-button">🎟️ Book Now</button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
