// features/search/searchSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // Başlangıç değeri olarak boş bir dize
    results: [],
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setQuery, setResults, setCurrentPage, setTotalPages } = searchSlice.actions;

export const selectSearchQuery = (state) => state.search.query;
export const selectSearchResults = (state) => state.search.results;
export const selectCurrentPage = (state) => state.search.currentPage;
export const selectTotalPages = (state) => state.search.totalPages;

export default searchSlice.reducer;
