/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  useSearchParams,
  useNavigate,
  useParams,
  Outlet,
  Link,
} from "react-router-dom";
import Header from "../../components/Header/Header";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import MovieTile from "../../components/MovieTile/MovieTile";
import GenreSelect from "../../components/GenreSelect/GenreSelect";
import SortControl from "../../components/SortControl/SortControl";
import Dialog from "../../components/Dialog/Dialog";
import MovieForm from "../../components/MovieForm/MovieForm";
import "./HomePage.css";
import { fetchMovies, fetchMovieById } from "../../api/moviesApi";

const genresList = ["All", "Documentary", "Comedy", "Horror", "Crime"];

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const navigate = useNavigate();
  const { movieId } = useParams();

  // Read values from URL with defaults
  const searchQuery = searchParams.get("query") || "";
  const searchBy = searchParams.get("searchBy") || "title";
  const selectedGenre = searchParams.get("genre") || "All";
  const sortOption = searchParams.get("sortBy") || "release_date";

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
    const loadMovieDetails = async () => {
      if (movieId) {
        console.log("Loading movie details for ID:", movieId);
        try {
          const movie = await fetchMovieById(movieId);
          console.log("Loaded movie details:", movie);
          setSelectedMovie(movie);
        } catch (err) {
          console.error("Failed to load movie details:", err);
        }
      } else {
        setSelectedMovie(null);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  // Add console log to check selected movie state
  useEffect(() => {
    console.log("Selected movie changed:", selectedMovie);
  }, [selectedMovie]);

  useEffect(() => {
    loadMovies();
  }, [searchQuery, searchBy, selectedGenre, sortOption]);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}${window.location.search}`);
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
    setSearchParams((params) => {
      params.set("query", query);
      params.set("searchBy", searchField);
      return params;
    });
  };

  const handleSortChange = (newSortOption) => {
    setSearchParams((params) => {
      params.set("sortBy", newSortOption);
      return params;
    });
  };

  const handleGenreSelect = (genre) => {
    setSearchParams((params) => {
      params.set("genre", genre);
      return params;
    });
  };

  return (
    <div className="homepage">
      {selectedMovie ? (
        <>
        <MovieDetails movie={selectedMovie} />
        <Outlet />
        </>
      ) : (
        <>
          <Header onSearch={handleSearch}>
            <Link
              to={`/new${window.location.search}`}
              className="add-movie-btn"
            >
              + ADD MOVIE
            </Link>
          </Header>
          <Outlet />
        </>
      )}
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
              onClick={() => handleMovieClick(movie)}
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
