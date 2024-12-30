import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import CategoryPage from '../pages/CategoryPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchTvShows } from '../redux/slices/movieSlice';

function RouterConfig() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
  const tvShows = useSelector((state) => state.movie.tvShows);
  const status = useSelector((state) => state.movie.status);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTvShows());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading movies!</div>;
  }
  return (
    <Routes>
      <Route path='/' element={<Home movies={movies} tvShows={tvShows} />} />
      <Route path='/film' element={<Movies movies={movies} tvShows={tvShows} />} />
      <Route path="/film/:category" element={<CategoryPage movies={movies.mediumCarousel}/>} /> 
    </Routes>
  );
}

export default RouterConfig;
