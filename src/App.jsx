import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import SingleMoviePage from './pages/SingleMoviePage';
import SearchMoviePage from './pages/SearchMoviePage';
import NotFoundPage from './pages/NotFoundPage';

const Layout = () => (
  <div>
    <Navbar />
    <div className="w-full p-4">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="top-rated" element={<TopRatedPage />} />
      <Route path="upcoming" element={<UpcomingPage />} />
      <Route path="movie/:id" element={<SingleMoviePage />} />
      <Route path="search/:query" element={<SearchMoviePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
