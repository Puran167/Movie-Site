import React from 'react';
import { Link } from 'react-router-dom';
import "./WelcomePage.css";

const WelcomePage = () => {
  const movies = [
    { title: "Oppenheimer", poster: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg" },
    { title: "Jawan", poster: "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Jawan_film_poster.jpg/250px-Jawan_film_poster.jpg" },
    { title: "Avengers", poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg" },
  ];

  return (
    <div className="welcome-container">
      
      <video autoPlay muted loop className="bg-video">
        <source src="/videos/movie 1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    
      <div className="overlay"></div>

      
      <div className="fade-in welcome-content">
        <h1>🎬 Welcome to MovieZone</h1>
        <p>Book your favorite movie tickets easily and quickly.</p>

        <div className="welcome-buttons">
  <Link to="/login" className="btn login-btn">Log In</Link>
  <Link to="/signup" className="btn register-btn">Register</Link>
</div>


        <div className="popular-section">
          <h2>🔥 Popular Now</h2>
          <div className="popular-movies">
            {movies.map((movie, index) => (
              <div key={index} className="movie-card">
                <img src={movie.poster} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
