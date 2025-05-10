import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieForm from './MovieForm';

describe('MovieForm Component', () => {
  const mockOnSubmit = jest.fn();
  const initialData = {
    title: 'Initial Title',
    releaseDate: '2022-01-01',
    url: 'http://example.com',
    genre: 'Action',
    rating: '8.5',
    runtime: '120',
    overview: 'Initial overview text'
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders all form fields with empty initial values', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Release Date')).toHaveValue('');
    expect(screen.getByLabelText('Movie URL')).toHaveValue('');
    expect(screen.getByLabelText('Rating')).toHaveValue('');
    expect(screen.getByLabelText('Genre')).toHaveValue('');
    expect(screen.getByLabelText('Runtime')).toHaveValue('');
    expect(screen.getByLabelText('Overview')).toHaveValue('');
  });

  test('populates form fields when initialData is provided', () => {
    render(<MovieForm initialData={initialData} onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Title')).toHaveValue(initialData.title);
    expect(screen.getByLabelText('Release Date')).toHaveValue(initialData.releaseDate);
    expect(screen.getByLabelText('Movie URL')).toHaveValue(initialData.url);
    expect(screen.getByLabelText('Rating')).toHaveValue(initialData.rating);
    expect(screen.getByLabelText('Genre')).toHaveValue(initialData.genre);
    expect(screen.getByLabelText('Runtime')).toHaveValue(initialData.runtime);
    expect(screen.getByLabelText('Overview')).toHaveValue(initialData.overview);
  });

  test('updates form state when input values change', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(titleInput).toHaveValue('New Title');

    const dateInput = screen.getByLabelText('Release Date');
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(dateInput).toHaveValue('2023-01-01');

    const overviewInput = screen.getByLabelText('Overview');
    fireEvent.change(overviewInput, { target: { value: 'New overview' } });
    expect(overviewInput).toHaveValue('New overview');
  });

  test('calls onSubmit with form data when submitted', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Movie' } });
    fireEvent.change(screen.getByLabelText('Genre'), { target: { value: 'Comedy' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Movie',
      releaseDate: '',
      url: '',
      genre: 'Comedy',
      rating: '',
      runtime: '',
      overview: ''
    });
  });

  test('resets form when reset button is clicked', () => {
    render(<MovieForm initialData={initialData} onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
    
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Release Date')).toHaveValue('');
    expect(screen.getByLabelText('Movie URL')).toHaveValue('');
    expect(screen.getByLabelText('Rating')).toHaveValue('');
    expect(screen.getByLabelText('Genre')).toHaveValue('');
    expect(screen.getByLabelText('Runtime')).toHaveValue('');
    expect(screen.getByLabelText('Overview')).toHaveValue('');
  });

  test('has all required form controls', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Release Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Movie URL')).toBeInTheDocument();
    expect(screen.getByLabelText('Rating')).toBeInTheDocument();
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByLabelText('Runtime')).toBeInTheDocument();
    expect(screen.getByLabelText('Overview')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('genre select has all options', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
  });
});