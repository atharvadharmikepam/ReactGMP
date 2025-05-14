import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import EditMovieForm from "./EditMovieForm";
import { fetchMovieById, updateMovie } from "../../api/moviesApi";

jest.mock("../../api/moviesApi");

describe("EditMovieForm Component", () => {
  const mockMovie = {
    id: "123",
    title: "Test Movie",
    release_date: "2023-01-01",
    poster_path: "http://example.com/poster.jpg",
    genres: ["Documentary"],
    runtime: 120,
    overview: "Test overview",
  };

  const mockNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMovieById.mockResolvedValue(mockMovie);
    updateMovie.mockResolvedValue({ ...mockMovie });
  });

  const renderWithRouter = (component) => {
    return render(
      <MemoryRouter initialEntries={[`/movie/${mockMovie.id}/edit`]}>
        <Routes>
          <Route path="/movie/:movieId/edit" element={component} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("loads and displays movie data", async () => {
    renderWithRouter(<EditMovieForm />);

    expect(screen.queryByText("EDIT MOVIE")).not.toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/title/i)).toHaveValue(mockMovie.title);
    expect(screen.getByLabelText(/release date/i)).toHaveValue(
      mockMovie.release_date
    );
    expect(screen.getByLabelText(/movie url/i)).toHaveValue(
      mockMovie.poster_path
    );
  });

  test("handles API error when loading movie", async () => {
    const error = new Error("Failed to fetch movie");
    fetchMovieById.mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    renderWithRouter(<EditMovieForm />);

    await waitFor(async () => {
      expect(consoleSpy).toHaveBeenCalledWith("Failed to load movie:", error);
    });

    consoleSpy.mockRestore();
  });

  test("updates movie successfully", async () => {
    renderWithRouter(<EditMovieForm />);

    await waitFor(() => {
      expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument();
    });

    const updatedData = {
      ...mockMovie,
      title: "Updated Movie Title",
    };

    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, updatedData.title);
    
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);
  });

  test("handles API error when updating movie", async () => {
    const error = new Error("Failed to update movie");
    updateMovie.mockRejectedValue(error);

    renderWithRouter(<EditMovieForm />);

    await waitFor(() => {
      expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument();
    });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Failed to update movie:", error);
    });

    consoleSpy.mockRestore();
  });

  test("navigates back when dialog is closed", async () => {
    renderWithRouter(<EditMovieForm />);

    await waitFor(() => {
      expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("renders Dialog with correct props", async () => {
    renderWithRouter(<EditMovieForm />);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });
  });

  test("passes correct initial data to MovieForm", async () => {
    renderWithRouter(<EditMovieForm />);

    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue(mockMovie.title);
    });
  });

  test("shows loading state initially", () => {
    renderWithRouter(<EditMovieForm />);
    expect(screen.queryByText("EDIT MOVIE")).not.toBeInTheDocument();
  });

  test("handles empty or invalid movieId", async () => {
    fetchMovieById.mockResolvedValue(null);

    renderWithRouter(<EditMovieForm />);

    await waitFor(() => {
      expect(screen.queryByRole("form")).not.toBeInTheDocument();
    });
  });
});
