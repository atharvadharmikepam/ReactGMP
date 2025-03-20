import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ initialQuery = "", onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const handleSearch = () => {
    onSearch(query);
  };
  const handleKeyPress = (e) => {
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
        onKeyPress={handleKeyPress}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
export default SearchForm;