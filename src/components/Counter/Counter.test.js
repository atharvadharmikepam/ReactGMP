import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  test("renders initial value provided in props", () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByText("Count: 10")).toBeInTheDocument();
  });

  test("clicking decrement button decrements the displayed value", () => {
    render(<Counter initialValue={5} />);
    
    const decrementButton = screen.getByRole("button", { name: /decrease count/i });
    fireEvent.click(decrementButton);
    
    expect(screen.getByText("Count: 4")).toBeInTheDocument();
  });

  test("clicking increment button increments the displayed value", () => {
    render(<Counter initialValue={2} />);
    
    const incrementButton = screen.getByRole("button", { name: /increase count/i });
    fireEvent.click(incrementButton);
    
    expect(screen.getByText("Count: 3")).toBeInTheDocument();
  });
});
