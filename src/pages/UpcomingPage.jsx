// src/pages/UpcomingPage.jsx
import React from "react";
import { getUpcomingMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const UpcomingPage = () => {
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getUpcomingMovies();

        const futureMovies = data.results
          .filter((movie) => new Date(movie.release_date) > new Date())
          .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

        const startIndex = (page - 1) * 20;
        const endIndex = page * 20;
        const paginatedMovies = futureMovies.slice(startIndex, endIndex);

        setMovies(paginatedMovies);
        setTotalPages(Math.ceil(futureMovies.length / 20));
      } catch (error) {
        console.error("Failed to fetch upcoming movies:", error);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${index}`}
            movie={movie}
            showReleaseDate
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default UpcomingPage;
