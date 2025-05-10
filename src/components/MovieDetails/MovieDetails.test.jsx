import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';

describe('MovieDetails Component', () => {
  const mockMovie = {
    imageUrl: 'https://example.com/poster.jpg',
    title: 'Inception',
    year: '2010',
    rating: '8.8',
    duration: '2h 28m',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    genres: ['Action', 'Sci-Fi', 'Thriller']
  };

  test('renders all movie details correctly', () => {
    render(<MovieDetails movie={mockMovie} />);
    
    const poster = screen.getByAltText('Inception');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', mockMovie.imageUrl);
    
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
    
    expect(screen.getByText('Action • Sci-Fi • Thriller')).toBeInTheDocument();
    
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('2h 28m')).toBeInTheDocument();
    
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });

  test('renders correctly with missing optional fields', () => {
    const minimalMovie = {
      imageUrl: 'https://example.com/poster.jpg',
      title: 'Minimal Movie',
      year: '2023',
      genres: ['Drama'],
      description: 'Simple description'
    };
    
    render(<MovieDetails movie={minimalMovie} />);
    
    expect(screen.getByText('Minimal Movie')).toBeInTheDocument();
    expect(screen.queryByTestId('rating')).not.toBeInTheDocument();
    expect(screen.queryByTestId('duration')).not.toBeInTheDocument();
  });

  test('handles empty genres array', () => {
    const movieWithNoGenres = {
      ...mockMovie,
      genres: []
    };
    
    render(<MovieDetails movie={movieWithNoGenres} />);
    expect(screen.queryByTestId('genres')).not.toBeInTheDocument();
  });

  test('matches snapshot with complete movie data', () => {
    const { asFragment } = render(<MovieDetails movie={mockMovie} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot with minimal movie data', () => {
    const minimalMovie = {
      imageUrl: 'https://example.com/poster.jpg',
      title: 'Minimal Movie',
      year: '2023',
      genres: ['Drama'],
      description: 'Simple description'
    };
    
    const { asFragment } = render(<MovieDetails movie={minimalMovie} />);
    expect(asFragment()).toMatchSnapshot();
  });
});