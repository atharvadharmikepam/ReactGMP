import React from "react";
import "./SortControl.css";

const SortControl = ({ selectedSort, onSortChange }) => {
  return (
    <div className="sort-control">
      <label className="sort-label">Sort by</label>
      <select 
        className="sort-select" 
        value={selectedSort} 
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="releaseDate">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortControl;
