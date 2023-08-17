import React, { useEffect, useState } from 'react';
import MovieCardComponent from '../component/MovieCard';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearSearchedMovieResponse,
	getMovieListResponse,
	getSearchedMovieResponse,
	setMovieListResponse,
	setSearchedMovieResponse,
} from '../core/DataSlice';

const HomePage = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const movieListResponse = useSelector(getMovieListResponse);
	const searchedMovieResponse = useSelector(getSearchedMovieResponse);

	const [movieList, setMovieList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchEnable, setSearchEnable] = useState(false);
	const [searchedText, setSearchedText] = useState('');

	useEffect(() => {
		//if search is enabled then restricting default movie API call, else calling API with page no
		!searchEnable && fetchMovie(currentPage);
		//calling movie search list when page no changes
		searchEnable && searchMovie(searchedText);
	}, [currentPage]);

	useEffect(() => {
		if (movieListResponse) {
			setMovieList(movieListResponse);
		}
	}, [movieListResponse]);

	useEffect(() => {
		if (searchedMovieResponse) {
			setMovieList(searchedMovieResponse);
		} else {
			setMovieList(movieListResponse);
		}
	}, [searchedMovieResponse]);

	const goToMovieDetails = (movieObj) => {
		//navigates to movies details page
		navigate('/MovieDetails', { state: { movieObj: movieObj } });
	};

	const onTyping = (text) => {
		setSearchedText(text.target.value);
	};

	useEffect(() => {
		//resetting current page to 1 and enabling search flag
		if (searchedText?.length) {
			setCurrentPage(1);
			setSearchEnable(true);
		}
	}, [searchedText]);

	useEffect(() => {
		//if search is enabled and search field has value the calling search API after delaly of 1 sec
		if (searchEnable && searchedText?.length) {
			var getSearchResult = setTimeout(() => {
				searchMovie(searchedText);
			}, 1000);
		}
		//if search box is empty then resetting the values
		if (searchedText?.length === 0) {
			setSearchEnable(false);
			setCurrentPage(1);
			dispatch(clearSearchedMovieResponse());
		}
		return () => {
			clearTimeout(getSearchResult);
		};
	}, [searchedText, searchEnable]);

	const fetchMovie = async (page) => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: process.env.REACT_APP_AUTH_TOKEN,
			},
		};

		fetch(
			`${process.env.REACT_APP_BASE_URL}movie/top_rated?language=en-US&page=${page}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				dispatch(setMovieListResponse(response));
			})
			.catch((err) => console.error(err));
	};

	const searchMovie = async (keyWord) => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: process.env.REACT_APP_AUTH_TOKEN,
			},
		};

		fetch(
			`${process.env.REACT_APP_BASE_URL}search/movie?query=${keyWord}&include_adult=false&language=en-US&page=${currentPage}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				dispatch(setSearchedMovieResponse(response));
			})
			.catch((err) => console.error(err));
	};

	const onNextClick = () => {
		setCurrentPage((prevState) => prevState + 1);
	};

	const onPrevClick = () => {
		setCurrentPage((prevState) => prevState - 1);
	};

	return (
		<div>
			<div className='flex bg-white justify-between p-3 border-b-2 shadow-sm items-center sticky top-0 z-50'>
				<div className='border w-10/12 md:w-[55%] flex pt-1 pb-1 items-center bg-gray-100 rounded'>
					<MagnifyingGlassIcon className='h-5 w-5 text-slate-400 hover:cursor-pointer' />
					<input
						className='w-full bg-gray-100 pl-3 border-none outline-none'
						type='text'
						value={searchedText}
						placeholder='Search'
						onChange={(text) => onTyping(text)}
					/>
				</div>
				<HomeIcon className='h-6 w-6 text-black hover:cursor-pointer' />
			</div>
			<div className='md:flex md:flex-wrap'>
				{movieList?.map((movie) => (
					<MovieCardComponent
						movieObj={movie}
						key={movie?.id?.toString()}
						onClickEvent={goToMovieDetails}
					/>
				))}
			</div>
			<div className='flex justify-center items-center p-4'>
				<button
					disabled={currentPage === 1}
					onClick={onPrevClick}
					className='pl-2 pr-2 bg-red-600 align-middle text-2xl font-extrabold text-white mr-10 border-2 rounded-full'
				>
					{'<'}
				</button>
				<h1 className='text-lg font-bold text-red-600'>{`Page: ${currentPage}`}</h1>
				<button
					onClick={onNextClick}
					className='pl-2 pr-2 bg-red-600 align-middle text-2xl font-extrabold text-white ml-10 border-2 rounded-full'
				>
					{'>'}
				</button>
			</div>
		</div>
	);
};

export default HomePage;
