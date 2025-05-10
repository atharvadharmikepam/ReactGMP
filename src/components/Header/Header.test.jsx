import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('Header Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnAddMovie = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    mockOnAddMovie.mockClear();
  });

  test('renders the Netflix Roulette logo correctly', () => {
    render(<Header onSearch={mockOnSearch} onAddMovie={mockOnAddMovie} />);
    
    expect(screen.getByText('netflix')).toBeInTheDocument();
    expect(screen.getByText('roulette')).toBeInTheDocument();
  });

  test('renders the "ADD MOVIE" button', () => {
    render(<Header onSearch={mockOnSearch} onAddMovie={mockOnAddMovie} />);
    
    const addButton = screen.getByRole('button', { name: /ADD MOVIE/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('+ ADD MOVIE');
  });

  test('calls onAddMovie when the add movie button is clicked', () => {
    render(<Header onSearch={mockOnSearch} onAddMovie={mockOnAddMovie} />);
    
    fireEvent.click(screen.getByRole('button', { name: /ADD MOVIE/i }));
    expect(mockOnAddMovie).toHaveBeenCalledTimes(1);
  });

  test('renders the main title "FIND YOUR MOVIE"', () => {
    render(<Header onSearch={mockOnSearch} onAddMovie={mockOnAddMovie} />);
    
    expect(screen.getByRole('heading', { name: /FIND YOUR MOVIE/i })).toBeInTheDocument();
  });

  test('renders the SearchForm component', () => {
    render(<Header onSearch={mockOnSearch} onAddMovie={mockOnAddMovie} />);
    
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  test('passes onSearch prop to SearchForm component', () => {
    render(<Header onSearch={mockOnSearch} onAddMovie={mockOnAddMovie} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.submit(screen.getByTestId('search-form'));
    
    expect(mockOnSearch).toHaveBeenCalled();
  });
});