import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieCast } from "../api/api";
import { FaStar, FaArrowLeft } from "react-icons/fa";

const SingleMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = React.useState({});
  const [cast, setCast] = React.useState([]);

  React.useEffect(() => {
    getMovieDetails(id).then((data) => {
      setMovie(data);
    });
    getMovieCast(id).then((data) => {
      setCast(data.cast);
    });
  }, [id]);
  const placeholderPoster =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : placeholderPoster;

  const backdropImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : imageUrl;
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center p-6 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${backdropImage})` }}
      ></div>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
      >
        <FaArrowLeft />
        <span>Back to List</span>
      </button>

      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row items-start lg:items-start lg:space-x-8 p-4 space-y-6 lg:space-y-0 bg-gray-800 rounded-lg shadow-lg">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full lg:w-1/3 h-auto lg:h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="flex flex-col items-start text-left space-y-4 lg:space-y-6">
          <h1 className="text-4xl font-extrabold">{movie.title}</h1>
          <div className="flex items-center text-yellow-400">
            <FaStar className="mr-1" />
            <span className="text-xl font-semibold">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-300 mt-4">{movie.overview}</p>
          <div className="mt-4 space-y-2">
            <p className="text-lg">
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            <p className="text-lg">
              <strong>Category:</strong>{" "}
              {movie.genres?.map((genre) => genre.name).join(", ")}
            </p>
            <p className="text-lg">
              <strong>Release Date:</strong>{" "}
              {new Date(movie.release_date).toLocaleDateString()}
            </p>
            <p className="text-lg">
              <strong>Tagline:</strong> {movie.tagline}
            </p>
            <p className="text-lg">
              <strong>Production Companies:</strong>
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              {movie.production_companies?.map(
                (company) =>
                  company.logo_path && (
                    <div
                      key={company.id}
                      className="w-24 h-auto p-2 bg-white rounded-lg shadow-lg flex items-center justify-center"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-xl mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cast.map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-yellow-700 p-4 rounded-lg relative"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : placeholderPoster
                }
                alt={actor.name}
                className="w-32 h-32 object-cover rounded-full shadow-lg mb-2"
              />
              <p className="text-sm font-semibold">{actor.name}</p>
              <p className="text-sm text-gray-400">{actor.character}</p>
              <div className="absolute inset-0 bg-gray-900 opacity-0 transition-opacity flex items-center justify-center rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;
