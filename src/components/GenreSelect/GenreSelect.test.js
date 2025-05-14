import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelect from "./GenreSelect";

describe("GenreSelect Component", () => {
  const genres = ["Action", "Comedy", "Drama"];
  const mockOnSelect = jest.fn();

  test("renders all genres passed in props", () => {
    render(<GenreSelect genres={genres} selectedGenre="" onSelect={mockOnSelect} />);

    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  test("highlights the selected genre", () => {
    render(<GenreSelect genres={genres} selectedGenre="Comedy" onSelect={mockOnSelect} />);

    const selectedButton = screen.getByText("Comedy");
    expect(selectedButton).toHaveClass("selected");
    expect(selectedButton).toHaveAttribute("aria-pressed", "true");
  });

  test('calls "onSelect" callback with correct genre when a button is clicked', () => {
    render(<GenreSelect genres={genres} selectedGenre="" onSelect={mockOnSelect} />);

    const actionButton = screen.getByText("Action");
    fireEvent.click(actionButton);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith("Action");
  });

  test('does not call "onSelect" when clicking an already selected genre', () => {
    render(<GenreSelect genres={genres} selectedGenre="Drama" onSelect={mockOnSelect} />);

    const dramaButton = screen.getByText("Drama");
    fireEvent.click(dramaButton);

    expect(mockOnSelect).not.toHaveBeenCalled();
  });
});
