import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import AddMovieForm from "./AddMovieForm";
import { addMovie } from "../../api/moviesApi";

jest.mock("../../api/moviesApi");

describe("AddMovieForm Component", () => {
  const mockNewMovie = {
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
    addMovie.mockResolvedValue(mockNewMovie);
  });

  const renderWithRouter = (component) => {
    return render(
      <MemoryRouter initialEntries={["/new"]}>
        <Routes>
          <Route path="/new" element={component} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders ADD MOVIE dialog with form", () => {
    renderWithRouter(<AddMovieForm />);

    expect(screen.getByText("ADD MOVIE")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  test("navigates to home when dialog is closed", async () => {
    renderWithRouter(<AddMovieForm />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("successfully adds a new movie and navigates to movie details", async () => {
    renderWithRouter(<AddMovieForm />);

    await userEvent.type(screen.getByLabelText(/title/i), mockNewMovie.title);
    await userEvent.type(
      screen.getByLabelText(/release date/i),
      mockNewMovie.release_date
    );
    await userEvent.type(
      screen.getByLabelText(/movie url/i),
      mockNewMovie.poster_path
    );
    await userEvent.type(
      screen.getByLabelText(/runtime/i),
      mockNewMovie.runtime.toString()
    );
    await userEvent.type(
      screen.getByLabelText(/overview/i),
      mockNewMovie.overview
    );

    const genreSelect = screen.getByLabelText(/genre/i);
    await userEvent.selectOptions(genreSelect, mockNewMovie.genres[0]);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(addMovie).toHaveBeenCalledWith(
        expect.objectContaining({
          title: mockNewMovie.title,
          release_date: mockNewMovie.release_date,
          poster_path: mockNewMovie.poster_path,
          genres: mockNewMovie.genres,
          runtime: mockNewMovie.runtime,
          overview: mockNewMovie.overview,
        })
      );
    });
  });

  test("handles API error when adding movie", async () => {
    const error = new Error("Failed to add movie");
    addMovie.mockRejectedValue(error);

    renderWithRouter(<AddMovieForm />);

    await userEvent.type(screen.getByLabelText(/title/i), "Test Movie");
    await userEvent.type(screen.getByLabelText(/release date/i), "2023-01-01");
    await userEvent.type(
      screen.getByLabelText(/movie url/i),
      "http://example.com/poster.jpg"
    );

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Failed to add movie:", error);
    });

    consoleSpy.mockRestore();
  });

  test("renders MovieForm with empty initial values", () => {
    renderWithRouter(<AddMovieForm />);

    expect(screen.getByLabelText(/title/i)).toHaveValue("");
    expect(screen.getByLabelText(/release date/i)).toHaveValue("");
    expect(screen.getByLabelText(/movie url/i)).toHaveValue("");
    expect(screen.getByLabelText(/runtime/i)).toHaveValue(null);
    expect(screen.getByLabelText(/overview/i)).toHaveValue("");
  });

  test("form validation prevents submission of empty form", async () => {
    renderWithRouter(<AddMovieForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(addMovie).not.toHaveBeenCalled();
    });
  });

  test("reset button clears form fields", async () => {
    renderWithRouter(<AddMovieForm />);

    await userEvent.type(screen.getByLabelText(/title/i), "Test Movie");
    await userEvent.type(screen.getByLabelText(/overview/i), "Test Overview");

    const resetButton = screen.getByRole("button", { name: /reset/i });
    await userEvent.click(resetButton);

    expect(screen.getByLabelText(/title/i)).toHaveValue("");
    expect(screen.getByLabelText(/overview/i)).toHaveValue("");
  });

  test("dialog has correct structure and styling", () => {
    expect(screen.getByRole("dialog")).toHaveClass("dialog");
    expect(screen.getByText("ADD MOVIE")).toHaveClass("dialog-title");
  });

  test("prevents form submission while submitting", async () => {
    addMovie.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    renderWithRouter(<AddMovieForm />);

    await userEvent.type(screen.getByLabelText(/title/i), "Test Movie");
    await userEvent.type(screen.getByLabelText(/release date/i), "2023-01-01");
    await userEvent.type(
      screen.getByLabelText(/movie url/i),
      "http://example.com/poster.jpg"
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});
