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
