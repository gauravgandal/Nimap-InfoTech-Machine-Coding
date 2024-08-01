// src/components/MovieCard.jsx

import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, showReleaseDate = false }) => {
  const releaseYear = new Date(movie.release_date).getFullYear();
  const releaseDate = new Date(movie.release_date).toLocaleDateString();

  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : placeholderImage;

  const popularity = movie.popularity;
  const popularityStyle = {
    width: `${Math.min(popularity / 10, 100)}%`,
    backgroundColor: `rgba(255, 165, 0, ${Math.min(popularity / 100, 1)})`,
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative bg-gradient-to-br from-purple-700 to-red-600 text-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 mx-2 my-4 sm:mx-1 sm:my-2" 
      style={{ width: "100%", maxWidth: "320px", height: "350px" }} 
    >
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
        style={{ objectFit: "cover" }}
      />
      <div
        className={`absolute top-2 left-2 bg-red-600 bg-opacity-70 text-white text-lg rounded-full px-3 py-2 font-bold`}
      >
        {showReleaseDate ? `Release Date: ${releaseDate}` : releaseYear}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center bg-gradient-to-t from-black to-transparent">
        <h2 className="text-xl font-extrabold mb-2 text-center bg-black bg-opacity-70 px-2 py-1 rounded max-w-full break-words">
          {movie.title}
        </h2>{" "}
        <div className="flex items-center mb-2 text-yellow-300">
          <FaStar className="mr-1" />
          <span className="text-lg font-semibold">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full mt-2">
          <div className="h-2 rounded-full" style={popularityStyle}></div>
        </div>
        <span className="text-sm mt-1 text-gray-300">
          Popularity: {popularity.toFixed(1)}
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
