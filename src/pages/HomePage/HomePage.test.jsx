import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import HomePage from "./HomePage";
import { fetchMovies, fetchMovieById } from "../../api/moviesApi";

jest.mock("../../api/moviesApi");

jest.mock("../../components/Header/Header", () => {
  return function MockHeader({ onSearch, children }) {
    return (
      <div data-testid="mock-header">
        {children}
        <input
          data-testid="search-input"
          onChange={(e) => onSearch(e.target.value, "title")}
        />
      </div>
    );
  };
});

jest.mock("../../components/MovieDetails/MovieDetails", () => {
  return function MockMovieDetails({ movie }) {
    return <div data-testid="mock-movie-details">{movie.title}</div>;
  };
});

const mockMovies = [
  {
    id: 1,
    title: "Movie 1",
    genres: ["Action"],
    release_date: "2021-01-01",
    poster_path: "path/to/poster1",
    overview: "Overview 1",
    runtime: 120,
  },
  {
    id: 2,
    title: "Movie 2",
    genres: ["Comedy"],
    release_date: "2021-02-01",
    poster_path: "path/to/poster2",
    overview: "Overview 2",
    runtime: 90,
  },
];

describe("HomePage Component", () => {
  beforeEach(() => {
    fetchMovies.mockResolvedValue(mockMovies);
    fetchMovieById.mockResolvedValue(mockMovies[0]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (route = "/") => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="new" element={<div>Add Movie Form</div>} />
            <Route
              path="movie/:movieId/edit"
              element={<div>Edit Movie Form</div>}
            />
          </Route>
          <Route path="/movie/:movieId" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders loading state initially", () => {
    renderWithRouter();
    expect(screen.getByText(/loading movies/i)).toBeInTheDocument();
  });

  test("renders movies after loading", async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
  });

  test("handles API error gracefully", async () => {
    const error = new Error("API Error");
    fetchMovies.mockRejectedValueOnce(error);
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(/failed to load movies/i)).toBeInTheDocument();
    });
  });

  test("navigates to movie details when movie is clicked", async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getAllByTestId("movie-tile")).toHaveLength(
        mockMovies.length
      );
    });

    fireEvent.click(screen.getAllByTestId("movie-tile")[0]);
    expect(window.location.pathname).toContain("/movie/1");
  });

  test("preserves search params when navigating", async () => {
    renderWithRouter("/?query=test&searchBy=title");
    await waitFor(() => {
      expect(screen.getAllByTestId("movie-tile")).toHaveLength(
        mockMovies.length
      );
    });

    fireEvent.click(screen.getAllByTestId("movie-tile")[0]);
    expect(window.location.search).toContain("query=test");
    expect(window.location.search).toContain("searchBy=title");
  });

  test("updates URL and triggers search when search params change", async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getAllByTestId("movie-tile")).toHaveLength(
        mockMovies.length
      );
    });

    const searchInput = screen.getByTestId("search-input");
    await userEvent.type(searchInput, "test search");

    expect(window.location.search).toContain("query=test%20search");
    expect(fetchMovies).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "test search",
      })
    );
  });

  test("updates movies when genre is selected", async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getAllByTestId("movie-tile")).toHaveLength(
        mockMovies.length
      );
    });

    const genreSelect = screen.getByTestId("genre-select");
    await userEvent.selectOptions(genreSelect, "Comedy");

    expect(fetchMovies).toHaveBeenCalledWith(
      expect.objectContaining({
        filter: "Comedy",
      })
    );
  });

  test("updates movies when sort option changes", async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getAllByTestId("movie-tile")).toHaveLength(
        mockMovies.length
      );
    });

    const sortSelect = screen.getByTestId("sort-select");
    await userEvent.selectOptions(sortSelect, "title");

    expect(fetchMovies).toHaveBeenCalledWith(
      expect.objectContaining({
        sortBy: "title",
      })
    );
  });

  test("loads and displays movie details correctly", async () => {
    renderWithRouter("/movie/1");

    await waitFor(() => {
      expect(screen.getByTestId("mock-movie-details")).toBeInTheDocument();
    });
  });

  test("renders add movie form when /new route is accessed", async () => {
    renderWithRouter("/new");

    await waitFor(() => {
      expect(screen.getByText("Add Movie Form")).toBeInTheDocument();
    });
  });

  test("renders edit movie form when /:movieId/edit route is accessed", async () => {
    renderWithRouter("/movie/1/edit");

    await waitFor(() => {
      expect(screen.getByText("Edit Movie Form")).toBeInTheDocument();
    });
  });

  test("maintains all URL parameters when switching views", async () => {
    renderWithRouter("/?query=test&genre=Comedy&sortBy=title");
    await waitFor(() => {
      expect(screen.getAllByTestId("movie-tile")).toHaveLength(
        mockMovies.length
      );
    });

    fireEvent.click(screen.getAllByTestId("movie-tile")[0]);
    expect(window.location.search).toContain("query=test");
    expect(window.location.search).toContain("genre=Comedy");
    expect(window.location.search).toContain("sortBy=title");
  });

  test("resets selected movie when navigating away from details", async () => {
    renderWithRouter("/movie/1");
    await waitFor(() => {
      expect(screen.getByTestId("mock-movie-details")).toBeInTheDocument();
    });

    window.history.pushState({}, "", "/");
    await waitFor(() => {
      expect(
        screen.queryByTestId("mock-movie-details")
      ).not.toBeInTheDocument();
    });
  });
});
