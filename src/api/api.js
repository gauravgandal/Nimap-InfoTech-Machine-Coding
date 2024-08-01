const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const resValidate = (response) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await resValidate(response);
    const filteredResults = data.results.filter((movie) => !movie.adult);
    return { results: filteredResults, total_pages: data.total_pages };
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    return { results: [], total_pages: 1 };
  }
};

export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await resValidate(response);
    const filteredResults = data.results.filter((movie) => !movie.adult);
    return { results: filteredResults, total_pages: data.total_pages };
  } catch (error) {
    console.error("Failed to fetch top-rated movies:", error);
    return { results: [], total_pages: 1 };
  }
};

export const getUpcomingMovies = async () => {
  const allMovies = [];
  let page = 1;
  let totalPages = 1;

  const targetLanguages = ["en", "hi"];

  while (page <= totalPages) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`
      );
      const data = await resValidate(response);
      const filteredMovies = data.results.filter(
        (movie) =>
          targetLanguages.includes(movie.original_language) && !movie.adult
      );
      allMovies.push(...filteredMovies);
      totalPages = data.total_pages;
      page += 1;
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
      break;
    }
  }

  return { results: allMovies, total_pages: totalPages };
};

export const getMovieVideos = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch movie videos:", error);
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    const data = await resValidate(response);
    return data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
  }
};

export const getMovieCast = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    const data = await resValidate(response);
    return data;
  } catch (error) {
    console.error("Failed to fetch movie cast:", error);
  }
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchSuggestions = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    return data.results
      ? data.results.slice(0, 5).map((result) => result.title)
      : [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
