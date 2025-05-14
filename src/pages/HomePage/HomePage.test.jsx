import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import HomePage from './HomePage';
import { fetchMovies, fetchMovieById } from '../../api/moviesApi';

jest.mock('../../api/moviesApi');
jest.mock('../../components/Header/Header', () => {
  return function MockHeader({ onSearch, onAddMovie }) {
    return (
      <div data-testid="mock-header">
        <button onClick={() => onAddMovie()}>Add Movie</button>
        <button onClick={() => onSearch('test', 'title')}>Search</button>
      </div>
    );
  };
});

jest.mock('../../components/MovieDetails/MovieDetails', () => {
  return function MockMovieDetails({ movie }) {
    return <div data-testid="mock-movie-details">{movie.title}</div>;
  };
});

const mockMovies = [
  { id: 1, title: 'Movie 1', genre: 'Action', release_date: '2021-01-01' },
  { id: 2, title: 'Movie 2', genre: 'Comedy', release_date: '2021-02-01' },
];

describe('HomePage Component', () => {
  beforeEach(() => {
    fetchMovies.mockResolvedValue(mockMovies);
    fetchMovieById.mockResolvedValue(mockMovies[0]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/*" element={ui} />
          <Route path="/movie/:movieId" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders loading state initially', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/loading movies/i)).toBeInTheDocument();
  });

  test('renders movies after loading', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  test('handles API error', async () => {
    fetchMovies.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/failed to load movies/i)).toBeInTheDocument();
    });
  });

  test('opens dialog when add movie button is clicked', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/add movie/i));
    expect(screen.getByText(/ADD MOVIE/i)).toBeInTheDocument();
  });

  test('updates URL when search is performed', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/search/i));
    expect(window.location.search).toContain('query=test');
    expect(window.location.search).toContain('searchBy=title');
  });

  test('displays movie details when movie is selected', async () => {
    renderWithRouter(<HomePage />, { route: '/movie/1' });
    await waitFor(() => {
      expect(screen.getByTestId('mock-movie-details')).toBeInTheDocument();
    });
  });

  test('handles genre selection', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
    const genreSelect = screen.getByRole('combobox');
    fireEvent.change(genreSelect, { target: { value: 'Comedy' } });
    expect(window.location.search).toContain('genre=Comedy');
  });

  test('handles sort selection', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
    const sortSelect = screen.getByLabelText(/sort by/i);
    fireEvent.change(sortSelect, { target: { value: 'title' } });
    expect(window.location.search).toContain('sortBy=title');
  });

  test('handles movie deletion', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(screen.getByText(/are you sure you want to delete this movie/i)).toBeInTheDocument();
  });

  test('handles movie editing', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton);
    expect(screen.getByText(/EDIT MOVIE/i)).toBeInTheDocument();
  });

  test('closes dialog when close button is clicked', async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/add movie/i));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/ADD MOVIE/i)).not.toBeInTheDocument();
  });
});