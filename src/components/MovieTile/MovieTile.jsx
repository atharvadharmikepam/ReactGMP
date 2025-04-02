import React, { useState, useEffect, useRef } from "react";
import "./MovieTile.css";

const MovieTile = ({ movie, onClick }) => {
  const { imageUrl, title, year, genres } = movie;
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
      <img src={imageUrl} alt={title} className="movie-image" />
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
            <button className="menu-item">Edit</button>
            <button className="menu-item">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTile;
