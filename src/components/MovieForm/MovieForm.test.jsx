import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import MovieForm from './MovieForm';

describe('MovieForm Component', () => {
  const mockOnSubmit = jest.fn();
  const initialData = {
    title: 'Initial Title',
    release_date: '2022-01-01',
    poster_path: 'http://example.com/poster.jpg',
    genres: ['Documentary', 'Comedy'],
    runtime: 120,
    overview: 'Initial overview text'
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders all form fields with empty initial values', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/release date/i)).toHaveValue('');
    expect(screen.getByLabelText(/movie url/i)).toHaveValue('');
    expect(screen.getByLabelText(/runtime/i)).toHaveValue(null);
    expect(screen.getByLabelText(/overview/i)).toHaveValue('');
  });

  test('populates form fields when initialData is provided', () => {
    render(<MovieForm initialData={initialData} onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/title/i)).toHaveValue(initialData.title);
    expect(screen.getByLabelText(/release date/i)).toHaveValue(initialData.release_date);
    expect(screen.getByLabelText(/movie url/i)).toHaveValue(initialData.poster_path);
    expect(screen.getByLabelText(/runtime/i)).toHaveValue(initialData.runtime);
    expect(screen.getByLabelText(/overview/i)).toHaveValue(initialData.overview);
  });

  test('shows validation errors when submitting empty form', async () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    fireEvent.submit(screen.getByRole('form'));

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(await screen.findByText('Release date is required')).toBeInTheDocument();
    expect(await screen.findByText('Poster URL is required')).toBeInTheDocument();
    expect(await screen.findByText('Genre is required')).toBeInTheDocument();
    expect(await screen.findByText('Runtime is required')).toBeInTheDocument();
    expect(await screen.findByText('Overview is required')).toBeInTheDocument();

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('validates URL format for poster path', async () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const urlInput = screen.getByLabelText(/movie url/i);
    userEvent.type(urlInput, 'invalid-url');
    fireEvent.blur(urlInput);

    await waitFor(() => {
      expect(screen.getByText('Must be a valid URL')).toBeInTheDocument();
    });
  });

  test('validates positive number for runtime', async () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const runtimeInput = screen.getByLabelText(/runtime/i);
    userEvent.type(runtimeInput, '-120');
    fireEvent.blur(runtimeInput);

    await waitFor(() => {
      expect(screen.getByText('Must be positive')).toBeInTheDocument();
    });
  });

  test('successfully submits form with valid data', async () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    userEvent.type(screen.getByLabelText(/title/i), 'Test Movie');
    userEvent.type(screen.getByLabelText(/release date/i), '2023-01-01');
    userEvent.type(screen.getByLabelText(/movie url/i), 'http://example.com/poster.jpg');
    userEvent.type(screen.getByLabelText(/runtime/i), '120');
    userEvent.type(screen.getByLabelText(/overview/i), 'Test overview');

    // Handle multiple select
    const genreSelect = screen.getByLabelText(/genre/i);
    userEvent.selectOptions(genreSelect, ['Documentary']);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Movie',
        release_date: '2023-01-01',
        poster_path: 'http://example.com/poster.jpg',
        genres: ['Documentary'],
        runtime: 120,
        overview: 'Test overview'
      });
    });
  });

  test('resets form when reset button is clicked', async () => {
    render(<MovieForm initialData={initialData} onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));

    await waitFor(() => expect(screen.getByLabelText(/title/i)).toHaveValue(''));
    await waitFor(() => expect(screen.getByLabelText(/release date/i)).toHaveValue(''));
    await waitFor(() => expect(screen.getByLabelText(/movie url/i)).toHaveValue(''));
    await waitFor(() => expect(screen.getByLabelText(/runtime/i)).toHaveValue(null));
    await waitFor(() => expect(screen.getByLabelText(/overview/i)).toHaveValue(''));
  });

  test('handles multiple genre selection', async () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const genreSelect = screen.getByLabelText(/genre/i);
    userEvent.selectOptions(genreSelect, ['Documentary', 'Comedy']);

    await waitFor(() => {
      expect(genreSelect.selectedOptions).toHaveLength(2);
    });
  });

  test('disables submit button while submitting', async () => {
    render(<MovieForm onSubmit={async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    }} />);

    // Fill out the form
    userEvent.type(screen.getByLabelText(/title/i), 'Test Movie');
    userEvent.type(screen.getByLabelText(/release date/i), '2023-01-01');
    userEvent.type(screen.getByLabelText(/movie url/i), 'http://example.com/poster.jpg');
    userEvent.type(screen.getByLabelText(/runtime/i), '120');
    userEvent.type(screen.getByLabelText(/overview/i), 'Test overview');
    userEvent.selectOptions(screen.getByLabelText(/genre/i), ['Documentary']);

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
});