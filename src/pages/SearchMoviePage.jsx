import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { searchMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import { FaSadTear } from "react-icons/fa";

function SearchMoviePage() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await searchMovies(query);
      setMovies(results);
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Search Results for "{query}"
      </h1>
      <div className="w-full">
        {movies.length > 0 ? (
          movies.length === 1 ? (
            <div className="flex justify-center">
              <MovieCard movie={movies[0]} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center">
            <FaSadTear className="text-9xl text-yellow-500 animate-bounce mb-6" />
            <p className="text-5xl font-extrabold text-red-400 mb-4 animate-pulse">
              Oops!
            </p>
            <p className="text-3xl font-semibold text-yellow-300 mb-6">
              No movies found for "{query}".
            </p>
            <p className="text-xl text-gray-400 mb-8">
              Try searching for something else!
            </p>
            <NavLink
              to="/"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition duration-300"
            >
              Go to Home
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchMoviePage;
