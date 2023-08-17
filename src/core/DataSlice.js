import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	movieListResponse: null,
	searchedMovieResponse: null,
	movieDetailResponse: null,
};

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setMovieListResponse: (state, action) => {
			let list = [...action.payload.results];
			state.movieListResponse = list;
		},
		setSearchedMovieResponse: (state, action) => {
			let list = [...action.payload.results];
			state.searchedMovieResponse = list;
		},
		setMovieDetailResponse: (state, action) => {
			state.movieDetailResponse = action.payload;
		},
		clearMovieListResponse: (state, action) => {
			state.movieListResponse = null;
		},
		clearSearchedMovieResponse: (state, action) => {
			state.searchedMovieResponse = null;
		},
		clearMovieDetailResponse: (state, action) => {
			state.movieDetailResponse = null;
		},
	},
});

export const {
	setMovieListResponse,
	setSearchedMovieResponse,
	setMovieDetailResponse,
	clearMovieListResponse,
	clearSearchedMovieResponse,
	clearMovieDetailResponse,
} = dataSlice.actions;

export const getMovieListResponse = (state) => state.data.movieListResponse;
export const getSearchedMovieResponse = (state) =>
	state.data.searchedMovieResponse;
export const getMovieDetailResponse = (state) => state.data.movieDetailResponse;

export default dataSlice.reducer;
