import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MovieTile from './MovieTile';

describe('MovieTile Component', () => {
  const mockMovie = {
    imageUrl: 'https://example.com/poster.jpg',
    title: 'Test Movie',
    year: '2023',
    genres: ['Action', 'Adventure'],
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders movie information correctly', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);
    
    expect(screen.getByAltText('Test Movie')).toHaveAttribute('src', mockMovie.imageUrl);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByAltText('Test Movie'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('toggles context menu when menu button is clicked', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);
    
    const menuButton = screen.getByText('⋮');
    fireEvent.click(menuButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    
    fireEvent.click(menuButton);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('closes context menu when clicking outside', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);
    
    const menuButton = screen.getByText('⋮');
    fireEvent.click(menuButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    
    fireEvent.click(document);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('does not close context menu when clicking inside it', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);
    
    const menuButton = screen.getByText('⋮');
    fireEvent.click(menuButton);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  test('stops event propagation when menu button is clicked', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);
    
    const menuButton = screen.getByText('⋮');
    fireEvent.click(menuButton);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('handles empty genres array', () => {
    const movieWithNoGenres = {...mockMovie, genres: []};
    render(<MovieTile movie={movieWithNoGenres} onClick={mockOnClick} />);
    
    expect(screen.queryByTestId('genres')).not.toBeInTheDocument();
  });
});