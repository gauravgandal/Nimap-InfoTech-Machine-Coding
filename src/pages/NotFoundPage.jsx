// src/pages/NotFoundPage.js
import React from "react";
import { Link } from "react-router-dom";
import { FaFilm } from "react-icons/fa";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="text-6xl mb-4"
      >
        <FaFilm />
      </motion.div>
      <h1 className="text-5xl font-bold mb-4">🎬 Lost in the Reel!</h1>
      <p className="text-lg mb-4">Oops! Looks like this scene doesn't exist.</p>
      <p className="text-md mb-4">
        You might have wandered off the script. But don't worry, we can get you
        back on track!
      </p>
      <Link
        to="/"
        className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
      >
        Go Back to the Spotlight
      </Link>
    </div>
  );
};

export default NotFoundPage;
