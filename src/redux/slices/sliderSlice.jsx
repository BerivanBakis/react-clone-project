import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sliderJson from '../../data/slider.json'; 

export const fetchSliderData = createAsyncThunk(
  'slider/fetchData',
  async () => {
    return sliderJson;
  }
);

const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    slides: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSliderData.fulfilled, (state, action) => {
        state.loading = false;
        state.slides = action.payload; // Veriyi state'e alıyoruz.
      })
      .addCase(fetchSliderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default sliderSlice.reducer;
