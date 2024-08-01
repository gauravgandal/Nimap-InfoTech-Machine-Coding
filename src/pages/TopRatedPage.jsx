import React from "react";
import { getTopRatedMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const TopRatedPage = () => {
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTopRatedMovies(page);
        const sortedMovies = data.results.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        setMovies(sortedMovies);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch top-rated movies:", error);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default TopRatedPage;
