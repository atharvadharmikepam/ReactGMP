import React from "react";
import "./GenreSelect.css";

const GenreSelect = ({ genres, selectedGenre, onSelect }) => {
  return (
    <div className="genre-select">
      {genres.map((genre) => (
        <button
          key={genre}
          className={genre === selectedGenre ? "selected" : ""}
          aria-pressed={genre === selectedGenre}
          onClick={() => genre !== selectedGenre && onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreSelect;