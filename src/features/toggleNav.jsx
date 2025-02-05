import { createSlice } from "@reduxjs/toolkit";

export const toggleNavSlice = createSlice({
  name: "toggle",
  initialState: {
    book: false,
    featured: false,
    collective: false,
  },
  reducers: {
    toggleBookCat: (state) => {
      state.book = !state.book;
    },
    toggleFeatured: (state) => {
      state.featured = !state.featured;
    },
    toggleCollective: (state) => {
      state.collective = !state.collective;
    },
  },
});

export const { toggleBookCat, toggleFeatured, toggleCollective } =
  toggleNavSlice.actions;

// Ensure the default export is correct
export default toggleNavSlice.reducer;
