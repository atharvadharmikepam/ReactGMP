import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import { fetchMovieById, updateMovie } from '../../api/moviesApi';

const EditMovieForm = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { movieId } = useParams();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await fetchMovieById(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Failed to load movie:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [movieId]);

  const handleSubmit = async (values) => {
    try {
      await updateMovie(movieId, values);
      navigate(`/movie/${movieId}`);
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Dialog title="EDIT MOVIE" onClose={() => navigate(-1)}>
      <MovieForm initialData={movie} onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default EditMovieForm;