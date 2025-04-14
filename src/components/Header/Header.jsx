import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = ({ onSearch, onAddMovie }) => {
  return (
    <header className="header">
      <div className="header-overlay">
        <div className="header-top-bar">
          <span className="logo">
            <span className="logo-red">netflix</span>
            <span className="logo-light">roulette</span>
          </span>
          <button className="add-movie-btn" onClick={onAddMovie}>
            + ADD MOVIE
          </button>
        </div>
        <div className="header-content">
          <h1 className="title">FIND YOUR MOVIE</h1>
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
};

export default Header;
