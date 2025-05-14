import axios from "axios";

const API_URL = "http://localhost:4000/movies";

export const fetchMovies = async ({
  search = "",
  searchBy = "title",
  sortBy = "release_date",
  sortOrder = "desc",
  filter = "",
  offset = 0,
  limit = 20,
} = {}) => {
  try {
    const params = {
      sortBy,
      sortOrder,
      offset,
      limit,
    };

    if (search) {
      params.search = search;
      params.searchBy = searchBy;
    }

    if (filter && filter !== "All") {
      params.filter = filter;
    }

    const response = await axios.get(API_URL, { params });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieById = async (movieId) => {
    try {
      const response = await fetch(`${API_URL}/${movieId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  };

  export const addMovie = async (movieData) => {
  const response = await fetch('your-api-endpoint/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    throw new Error('Failed to add movie');
  }

  return response.json();
};

export const updateMovie = async (movieId, movieData) => {
  const response = await fetch(`your-api-endpoint/movies/${movieId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    throw new Error('Failed to update movie');
  }

  return response.json();
};