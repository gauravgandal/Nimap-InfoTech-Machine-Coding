// src/components/HomePage.jsx

import React from "react";
import { getPopularMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchMovies = async () => {
      const { results, total_pages } = await getPopularMovies(page);
      const sortedMovies = results.sort((a, b) => b.popularity - a.popularity);
      setMovies(sortedMovies);
      setTotalPages(total_pages);
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="bg-gray-900 min-h-screen w-full p-4">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default HomePage;
