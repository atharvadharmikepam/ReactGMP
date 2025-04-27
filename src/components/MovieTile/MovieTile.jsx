import React, { useState, useEffect, useRef } from "react";
import "./MovieTile.css";

const MovieTile = ({ movie, onClick, onEdit, onDelete }) => {
  const { poster_path, title, release_date, genres } = movie;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const year = new Date(release_date).getFullYear();

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="movie-tile" onClick={onClick}>
      <img src={poster_path} alt={title} className="movie-image" />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <span className="movie-year">{year}</span>
      </div>
      <p className="movie-genres">{genres.join(", ")}</p>

      <div className="menu-container" ref={menuRef}>
        <button className="menu-button" onClick={handleMenuToggle}>
          ⋮
        </button>
        {showMenu && (
          <div className="context-menu">
            <button
              className="menu-item"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(movie);
              }}
            >
              Edit
            </button>
            <button
              className="menu-item"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(movie);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTile;
