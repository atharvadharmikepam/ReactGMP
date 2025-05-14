import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = ({ onSearch, children }) => {
  const [searchBy, setSearchBy] = useState("title");

  const handleSearch = (query) => {
    onSearch(query, searchBy);
  };

  return (
    <header className="header">
      <div className="header-overlay">
        <div className="header-top-bar">
          <span className="logo">
            <span className="logo-red">netflix</span>
            <span className="logo-light">roulette</span>
          </span>
          {children}
        </div>
        <div className="header-content">
          <h1 className="title">FIND YOUR MOVIE</h1>
          <div className="search-controls">
            <select
              className="search-select"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="genres">Genre</option>
            </select>
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;