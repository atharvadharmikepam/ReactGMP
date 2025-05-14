import { render, screen, fireEvent } from "@testing-library/react";
import SortControl from "./SortControl";

describe("SortControl Component", () => {
  test("displays the correct initial selected value", () => {
    render(<SortControl selectedSort="title" onSortChange={() => {}} />);
    expect(screen.getByDisplayValue("Title")).toBeInTheDocument();
  });

  test("calls onSortChange when a new option is selected", () => {
    const mockOnSortChange = jest.fn();
    render(<SortControl selectedSort="releaseDate" onSortChange={mockOnSortChange} />);
    
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "title" } });
    
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith("title");
  });

  test("renders all sorting options", () => {
    render(<SortControl selectedSort="releaseDate" onSortChange={() => {}} />);
    expect(screen.getByRole("option", { name: "Release Date" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Title" })).toBeInTheDocument();
  });
});
