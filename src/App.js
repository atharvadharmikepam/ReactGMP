import React, { useState } from "react";
import Counter from "./components/Counter/Counter";
import SearchForm from "./components/SearchForm/SearchForm";
import GenreSelect from "./components/GenreSelect/GenreSelect";
import "./App.css";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState("Comedy");

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log("Selected genre:", genre);
  };

  return (
    <div>
      <Counter initialValue={0} />
      <SearchForm initialQuery="React" onSearch={handleSearch} />
      <GenreSelect
        genres={["Action", "Comedy", "Drama", "Horror"]}
        selectedGenre={selectedGenre}
        onSelect={handleGenreSelect}
      />
    </div>
  );
};

export default App;