import React, { useState } from "react";
import Header from "../../components/Header/Header";
import MovieTile from "../../components/MovieTile/MovieTile";
import GenreSelect from "../../components/GenreSelect/GenreSelect";
import SortControl from "../../components/SortControl/SortControl";
import Dialog from "../../components/Dialog/Dialog";
import MovieForm from "../../components/MovieForm/MovieForm";
import "./HomePage.css";
import movies from "../../Mock/mockMovies";

const genresList = ["All", "Documentary", "Comedy", "Horror", "Crime"];

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOption, setSortOption] = useState("releaseDate");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);

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
  };

  const filteredMovies = movies.filter((movie) => {
    if (selectedGenre === "All") return true;
    return movie.genres.includes(selectedGenre);
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else {
      return parseInt(b.year) - parseInt(a.year);
    }
  });

  return (
    <div className="homepage">
      <Header
        onAddMovie={handleAddMovie}
        onSearch={(query) => {
          console.log("Search Query:", query);
        }}
      />

      <div className="controls-bar">
        <GenreSelect
          genres={genresList}
          selectedGenre={selectedGenre}
          onSelect={setSelectedGenre}
        />

        <SortControl selectedSort={sortOption} onSortChange={setSortOption} />
      </div>

      <div className="movie-grid">
        {sortedMovies.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            onClick={() => {}}
            onEdit={handleEditMovie}
            onDelete={handleDeleteMovie}
          />
        ))}
      </div>
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
            <MovieForm
              initialData={editMovie}
              onSubmit={handleSubmitMovie}
            />
          )}

          {movieToDelete && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this movie?</p>
              <button
                className="submit-btn"
                onClick={() => {
                  console.log("Deleted Movie:", movieToDelete);
                  handleCloseDialog();
                }}
              >
                CONFIRM
              </button>
            </div>
          )}

          {!editMovie && !movieToDelete && (
            <MovieForm
              onSubmit={handleSubmitMovie}
            />
          )}
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;
