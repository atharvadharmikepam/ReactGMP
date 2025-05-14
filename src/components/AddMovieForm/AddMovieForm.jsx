import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import { addMovie } from '../../api/moviesApi';

const AddMovieForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const newMovie = await addMovie(values);
      navigate(`/movie/${newMovie.id}`);
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  return (
    <Dialog title="ADD MOVIE" onClose={() => navigate('/')}>
      <MovieForm onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default AddMovieForm;