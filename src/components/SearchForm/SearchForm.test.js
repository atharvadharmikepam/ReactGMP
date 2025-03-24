import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm Component", () => {
  const mockOnSearch = jest.fn();

  test("renders input with initial value passed in props", () => {
    render(<SearchForm initialQuery="test query" onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test query");
  });

  test('calls "onSearch" with correct value after typing and clicking the Search button', () => {
    render(<SearchForm initialQuery="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "New Query" } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("New Query");
  });

  test('calls "onSearch" with correct value after typing and pressing Enter key', () => {
    render(<SearchForm initialQuery="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "Another Query" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("Another Query");
  });

  test('does not call "onSearch" if input is empty and Search button is clicked', () => {
    render(<SearchForm initialQuery="" onSearch={mockOnSearch} />);

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('does not call "onSearch" if input is empty and Enter key is pressed', () => {
    render(<SearchForm initialQuery="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
