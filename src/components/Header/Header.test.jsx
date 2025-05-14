import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

describe("Header Component", () => {
  const mockOnSearch = jest.fn();
  const mockChildren = <button>Test Child</button>;

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test("renders the Netflix Roulette logo correctly", () => {
    render(<Header onSearch={mockOnSearch} />);

    const netflixText = screen.getByText("netflix");
    const rouletteText = screen.getByText("roulette");

    expect(netflixText).toBeInTheDocument();
    expect(netflixText).toHaveClass("logo-red");
    expect(rouletteText).toBeInTheDocument();
    expect(rouletteText).toHaveClass("logo-light");
  });

  test("renders children components correctly", () => {
    render(<Header onSearch={mockOnSearch}>{mockChildren}</Header>);

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test('renders the main title "FIND YOUR MOVIE"', () => {
    render(<Header onSearch={mockOnSearch} />);

    const title = screen.getByText("FIND YOUR MOVIE");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
    expect(title).toHaveClass("title");
  });

  test("renders search controls with correct initial state", () => {
    render(<Header onSearch={mockOnSearch} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("title");
    expect(select).toHaveClass("search-select");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue("title");
    expect(options[1]).toHaveValue("genres");
  });

  test("updates searchBy state when select value changes", async () => {
    render(<Header onSearch={mockOnSearch} />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "genres");

    expect(select).toHaveValue("genres");
  });

  test("calls onSearch with correct parameters when search is triggered", async () => {
    render(<Header onSearch={mockOnSearch} />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "genres");

    const searchQuery = "test query";
    const searchInput = screen.getByRole("textbox");
    await userEvent.type(searchInput, searchQuery);

    fireEvent.submit(screen.getByRole("form"));

    expect(mockOnSearch).toHaveBeenCalledWith(searchQuery, "genres");
  });

  test("maintains search type when performing multiple searches", async () => {
    render(<Header onSearch={mockOnSearch} />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "genres");

    await userEvent.type(screen.getByRole("textbox"), "first search");
    fireEvent.submit(screen.getByRole("form"));
    expect(mockOnSearch).toHaveBeenCalledWith("first search", "genres");

    await userEvent.clear(screen.getByRole("textbox"));
    await userEvent.type(screen.getByRole("textbox"), "second search");
    fireEvent.submit(screen.getByRole("form"));
    expect(mockOnSearch).toHaveBeenCalledWith("second search", "genres");
  });

  test("header structure and styling", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("header-overlay")).toBeInTheDocument();
    expect(screen.getByTestId("header-top-bar")).toBeInTheDocument();
    expect(screen.getByTestId("header-content")).toBeInTheDocument();
    expect(screen.getByTestId("search-controls")).toBeInTheDocument();
  });

  test("search controls layout", () => {
    const searchControls = screen.getByTestId("search-controls");
    expect(searchControls).toContainElement(screen.getByRole("combobox"));
    expect(
      screen.getAllByRole("combobox").length +
        screen.getAllByRole("form").length
    ).toBe(2);
  });

  test("handles empty children prop", () => {
    render(<Header onSearch={mockOnSearch} />);

    const topBar = screen.getByTestId("header-top-bar");
    expect(topBar).toContainElement(screen.getByText("netflix"));
  });

  test("search type select has correct styling", () => {
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("search-select");
  });
});
