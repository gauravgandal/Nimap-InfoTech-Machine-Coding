import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilm, FaAward, FaCalendarAlt } from 'react-icons/fa';
import { fetchSuggestions } from '../api/api';

function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getSuggestions = async () => {
            if (searchQuery) {
                const results = await fetchSuggestions(searchQuery);
                setSuggestions(results);
            } else {
                setSuggestions([]);
            }
        };
        const debounceGetSuggestions = setTimeout(getSuggestions, 300);

        return () => clearTimeout(debounceGetSuggestions);
    }, [searchQuery]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        navigate(`/search/${suggestion}`);
        setSuggestions([]);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${searchQuery}`);
    };

    return (
        <header className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white shadow-lg sticky z-50 top-0">
            <nav className="px-4 lg:px-6 py-4">
                <div className="flex items-center justify-between mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/movie-34-146261.png?f=webp&w=256"
                            className="h-16"
                            alt="Logo"
                        />
                        <span className="text-3xl font-extrabold text-yellow-400 hover:text-yellow-300 transition duration-300">
                            <span className="text-red-600">Movies </span>
                            <span className="text-yellow-300">App</span>
                        </span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 lg:hidden"
                        onClick={toggleMobileMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>

                    {/* Route Elements and Search Bar */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <ul className="flex space-x-8">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center py-3 px-4 rounded-lg font-bold text-xl duration-300 ${isActive ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                    }
                                >
                                    <FaFilm className="mr-2 text-pink-800" />
                                    Popular
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/top-rated"
                                    className={({ isActive }) =>
                                        `flex items-center py-3 px-4 rounded-lg font-bold text-xl duration-300 ${isActive ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                    }
                                >
                                    <FaAward className="mr-2 text-pink-800" />
                                    Top Rated
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/upcoming"
                                    className={({ isActive }) =>
                                        `flex items-center py-3 px-4 rounded-lg font-bold text-xl duration-300 ${isActive ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                    }
                                >
                                    <FaCalendarAlt className="mr-2 text-pink-800" />
                                    Upcoming
                                </NavLink>
                            </li>
                        </ul>
                        <form
                            onSubmit={handleSearchSubmit}
                            className="relative flex items-center"
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search movies..."
                                className="px-4 py-2 text-gray-900 rounded-lg border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-60"
                            />
                            <button
                                type="submit"
                                className="ml-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition duration-300 flex items-center"
                            >
                                <FaSearch className="mr-2" />
                                Search
                            </button>
                            {suggestions.length > 0 && (
                                <ul className="absolute top-full mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-10">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </form>
                    </div>
                    <div
                        id="mobile-menu"
                        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                        role="dialog"
                        aria-labelledby="mobile-menu-label"
                        aria-modal="true"
                    >
                        <div className="flex justify-end p-4">
                            <button
                                type="button"
                                className="text-gray-400 hover:text-white"
                                onClick={toggleMobileMenu}
                            >
                                <span className="sr-only">Close menu</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col items-center pt-4">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center py-3 px-4 rounded-lg font-bold text-xl duration-300 ${isActive ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                }
                                onClick={toggleMobileMenu}
                            >
                                <FaFilm className="mr-2 text-pink-800" />
                                Popular
                            </NavLink>
                            <NavLink
                                to="/top-rated"
                                className={({ isActive }) =>
                                    `flex items-center py-3 px-4 rounded-lg font-bold text-xl duration-300 ${isActive ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                }
                                onClick={toggleMobileMenu}
                            >
                                <FaAward className="mr-2 text-pink-800" />
                                Top Rated
                            </NavLink>
                            <NavLink
                                to="/upcoming"
                                className={({ isActive }) =>
                                    `flex items-center py-3 px-4 rounded-lg font-bold text-xl duration-300 ${isActive ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                }
                                onClick={toggleMobileMenu}
                            >
                                <FaCalendarAlt className="mr-2 text-pink-800" />
                                Upcoming
                            </NavLink>
                            <form
                                onSubmit={handleSearchSubmit}
                                className="relative flex items-center mt-4"
                            >
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search movies..."
                                    className="px-2 py-2 text-gray-900 rounded-lg border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-55"
                                />
                                <button
                                    type="submit"
                                    className="ml-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition duration-300 flex items-center"
                                >
                                    <FaSearch className="mr-2" />
                                    Search
                                </button>
                                {suggestions.length > 0 && (
                                    <ul className="absolute top-full mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-10">
                                        {suggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
                                            >
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default NavBar;
