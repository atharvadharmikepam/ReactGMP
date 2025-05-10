/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import MovieTile from "../../components/MovieTile/MovieTile";
import GenreSelect from "../../components/GenreSelect/GenreSelect";
import SortControl from "../../components/SortControl/SortControl";
import Dialog from "../../components/Dialog/Dialog";
import MovieForm from "../../components/MovieForm/MovieForm";
import "./HomePage.css";
import { fetchMovies } from "../../api/moviesApi";

const genresList = ["All", "Documentary", "Comedy", "Horror", "Crime"];

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOption, setSortOption] = useState("release_date");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");

  const loadMovies = async () => {
    try {
      setLoading(true);
  
      const genreFilter = selectedGenre !== "All" ? selectedGenre : "";
  
      const moviesData = await fetchMovies({
        search: searchQuery,
        searchBy,
        sortBy: sortOption,
        sortOrder: "desc",
        filter: genreFilter,
        offset: 0,
        limit: 20,
      });
  
      setMovies(moviesData);
      setLoading(false);
    } catch (err) {
      setError("Failed to load movies.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [searchQuery, searchBy, selectedGenre, sortOption]);

  const handleAddMovie = () => {
    setIsDialogOpen(true);
  };

  const handleEditMovie = (movie) => {
    setEditMovie(movie);
    setIsDialogOpen(true);
  };

  const handleDeleteMovie = (movie) => {
    setMovieToDelete(movie);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditMovie(null);
    setMovieToDelete(null);
  };

  const handleSubmitMovie = (movieData) => {
    console.log("New Movie:", movieData);
    setIsDialogOpen(false);
    loadMovies();
  };

  const handleSearch = (query, searchField) => {
    setSearchQuery(query);
    setSearchBy(searchField);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="homepage">
      <Header onAddMovie={handleAddMovie} onSearch={handleSearch} />

      <div className="controls-bar">
        <GenreSelect
          genres={genresList}
          selectedGenre={selectedGenre}
          onSelect={handleGenreSelect}
        />

        <SortControl
          selectedSort={sortOption}
          onSortChange={handleSortChange}
        />
      </div>

      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onClick={() => {}}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
            />
          ))}
        </div>
      )}

      {isDialogOpen && (
        <Dialog
          title={
            editMovie
              ? "EDIT MOVIE"
              : movieToDelete
              ? "DELETE MOVIE"
              : "ADD MOVIE"
          }
          onClose={handleCloseDialog}
        >
          {editMovie && (
            <MovieForm initialData={editMovie} onSubmit={handleSubmitMovie} />
          )}

          {movieToDelete && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this movie?</p>
              <button
                className="submit-btn"
                onClick={() => {
                  console.log("Deleted Movie:", movieToDelete);
                  handleCloseDialog();
                  loadMovies();
                }}
              >
                CONFIRM
              </button>
            </div>
          )}

          {!editMovie && !movieToDelete && (
            <MovieForm onSubmit={handleSubmitMovie} />
          )}
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;
