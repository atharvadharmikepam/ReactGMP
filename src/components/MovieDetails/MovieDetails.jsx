import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {
  const { imageUrl, title, year, rating, duration, description, genres } = movie;

  return (
    <div className="movie-details">
      <img src={imageUrl} alt={title} className="movie-poster" />
      <div className="movie-info">
        <div className="movie-header">
          <h1 className="movie-title">{title}</h1>
          <span className="movie-rating">{rating}</span>
        </div>
        <p className="movie-genres">{genres.join(" • ")}</p>
        <div className="movie-meta">
          <span className="movie-year">{year}</span>
          <span className="movie-duration">{duration}</span>
        </div>
        <p className="movie-description">{description}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
