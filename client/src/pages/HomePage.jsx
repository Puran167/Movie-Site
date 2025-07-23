import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="homepage-content">
        <h1 className="page-title">🎬 Now Showing</h1>
        <div className="movie-scroll-row">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
