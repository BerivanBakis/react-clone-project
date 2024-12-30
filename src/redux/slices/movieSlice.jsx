import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moviesJson from '../../data/movies.json';
import tvShowsJson from '../../data/tvShows.json';

const fetchData = (type, jsonData) => createAsyncThunk(
  `${type}/fetchData`,
  async () => {
    return jsonData;
  }
);

const initialState = {
  movies: [],
  tvShows: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = fetchData('movies', moviesJson);
export const fetchTvShows = fetchData('tvShows', tvShowsJson);

const movieSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTvShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTvShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tvShows = action.payload;
      })
      .addCase(fetchTvShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
