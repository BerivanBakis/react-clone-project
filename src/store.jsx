import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './redux/slices/movieSlice'
import sliderReducer  from './redux/slices/sliderSlice'
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    slider: sliderReducer,
  },
})