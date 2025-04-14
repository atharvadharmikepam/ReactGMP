import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ initialQuery = "", onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What do you want to watch?"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
export default SearchForm;