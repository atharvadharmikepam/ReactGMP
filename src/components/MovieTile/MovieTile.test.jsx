import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieTile from './MovieTile';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MovieTile Component', () => {
  const mockMovie = {
    id: '123',
    poster_path: 'https://example.com/poster.jpg',
    title: 'Test Movie',
    release_date: '2023-01-01',
    genres: ['Action', 'Adventure'],
  };

  const mockOnClick = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders movie information correctly', () => {
    renderWithRouter(
      <MovieTile 
        movie={mockMovie} 
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByAltText('Test Movie')).toHaveAttribute('src', mockMovie.poster_path);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
  });

  test('calls onClick when movie tile is clicked', () => {
    renderWithRouter(
      <MovieTile 
        movie={mockMovie} 
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    fireEvent.click(screen.getByTestId('movie-tile'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('toggles context menu when menu button is clicked', () => {
    renderWithRouter(
      <MovieTile 
        movie={mockMovie} 
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const menuButton = screen.getByRole('button', { name: '⋮' });
    fireEvent.click(menuButton);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    
    fireEvent.click(menuButton);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('closes context menu when clicking outside', () => {
    renderWithRouter(
      <MovieTile 
        movie={mockMovie} 
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const menuButton = screen.getByRole('button', { name: '⋮' });
    fireEvent.click(menuButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    
    fireEvent.click(document.body);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    renderWithRouter(
      <MovieTile 
        movie={mockMovie} 
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const menuButton = screen.getByRole('button', { name: '⋮' });
    fireEvent.click(menuButton);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockMovie);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('renders correct edit link with search params', () => {
    Object.defineProperty(window, 'location', {
      value: { search: '?query=test' },
      writable: true
    });

    renderWithRouter(
      <MovieTile 
        movie={mockMovie} 
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const menuButton = screen.getByRole('button', { name: '⋮' });
    fireEvent.click(menuButton);
    
    const editLink = screen.getByText('Edit');
    expect(editLink).toHaveAttribute('href', `/movie/${mockMovie.id}/edit?query=test`);
  });

  test('handles movies with no genres gracefully', () => {
    const movieWithNoGenres = { ...mockMovie, genres: [] };
    renderWithRouter(
      <MovieTile 
        movie={movieWithNoGenres} 
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByText('')).toBeInTheDocument();
  });

  test('prevents event bubbling when clicking menu items', () => {
    renderWithRouter(
      <MovieTile 
        movie={mockMovie} 
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const menuButton = screen.getByRole('button', { name: '⋮' });
    fireEvent.click(menuButton);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});