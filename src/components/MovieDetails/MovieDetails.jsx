import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {

  const { poster_path, title, release_date, vote_average, runtime, overview, genres } = movie;

  return (
    <div className="movie-details">
      <img src={poster_path} alt={title} className="movie-poster" />
      <div className="movie-info">
        <div className="movie-header">
          <h1 className="movie-title">{title}</h1>
          <span className="movie-rating">{vote_average}</span>
        </div>
        <p className="movie-genres">{genres.join(" • ")}</p>
        <div className="movie-meta">
          <span className="movie-year">{release_date}</span>
          <span className="movie-duration">{runtime}</span>
        </div>
        <p className="movie-description">{overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
