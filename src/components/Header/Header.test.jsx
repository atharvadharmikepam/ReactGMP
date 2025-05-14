import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('Header Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders the Netflix Roulette logo correctly', () => {
    render(<Header onSearch={mockOnSearch} />);
    
    expect(screen.getByText('netflix')).toBeInTheDocument();
    expect(screen.getByText('roulette')).toBeInTheDocument();
  });

  test('renders the "ADD MOVIE" button', () => {
    render(<Header onSearch={mockOnSearch} />);
    
    const addButton = screen.getByRole('button', { name: /\+ ADD MOVIE/i });
    expect(addButton).toBeInTheDocument();
  });

  test('calls onSearch with empty query and "add" when add movie button is clicked', () => {
    render(<Header onSearch={mockOnSearch} />);
    
    fireEvent.click(screen.getByRole('button', { name: /\+ ADD MOVIE/i }));
    expect(mockOnSearch).toHaveBeenCalledWith('', 'add');
  });

  test('renders the main title "FIND YOUR MOVIE"', () => {
    render(<Header onSearch={mockOnSearch} />);
    
    expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
  });

  test('renders the search select with correct options', () => {
    render(<Header onSearch={mockOnSearch} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Genre' })).toBeInTheDocument();
  });

  test('updates searchBy state when select value changes', () => {
    render(<Header onSearch={mockOnSearch} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'genres' } });
    expect(select.value).toBe('genres');
  });

  test('calls onSearch with correct parameters when search is performed', () => {
    render(<Header onSearch={mockOnSearch} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'genres' } });

    const searchQuery = 'test query';
    fireEvent.change(screen.getByRole('textbox'), { target: { value: searchQuery } });
    fireEvent.submit(screen.getByTestId('search-form'));

    expect(mockOnSearch).toHaveBeenCalledWith(searchQuery, 'genres');
  });

  test('default search type is "title"', () => {
    render(<Header onSearch={mockOnSearch} />);
    
    const select = screen.getByRole('combobox');
    expect(select.value).toBe('title');
  });

  test('header has correct CSS classes', () => {    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('header-top-bar')).toBeInTheDocument();
    expect(screen.getByTestId('header-content')).toBeInTheDocument();
  });
});