import React, { useEffect, useState } from 'react';
import MovieCardComponent from '../component/MovieCard';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
	const navigate = useNavigate();

	const [movieList, setMovieList] = useState([]);

	useEffect(() => {
		fetchMovie(1);
	}, []);

	const goToMovieDetails = (movieObj) => {
		navigate('/MovieDetails', { state: { movieObj: movieObj } });
	};

	const [searchedText, setSearchedText] = useState('');

	const onTyping = (text) => {
		setSearchedText(text.target.value);
	};

	useEffect(() => {
		if (searchedText?.length) {
			var getSearchResult = setTimeout(() => {
				searchMovie(searchedText);
			}, 1500);
		}
		return () => {
			clearTimeout(getSearchResult);
		};
	}, [searchedText]);

	const fetchMovie = async (page) => {
		let list = [];
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGUyZmNiMGY1ZTJmMGQyMjQyNzNlNTMwMzBiY2U3MSIsInN1YiI6IjY0ZGNmNmM2MzcxMDk3MDBjNTFkNWFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yCJdmDi1Y8_RwrTxonbIz5NBvZD7FIAt7acsdYYJ-50',
			},
		};

		fetch(
			`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				list = [...movieList, ...response?.results];
				setMovieList(list);
			})
			.catch((err) => console.error(err));
	};

	const searchMovie = async (keyWord) => {
		let list = [];
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGUyZmNiMGY1ZTJmMGQyMjQyNzNlNTMwMzBiY2U3MSIsInN1YiI6IjY0ZGNmNmM2MzcxMDk3MDBjNTFkNWFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yCJdmDi1Y8_RwrTxonbIz5NBvZD7FIAt7acsdYYJ-50',
			},
		};

		fetch(
			`https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=1`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				list = [...response?.results];
				setMovieList(list);
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
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
		</>
	);
};

export default HomePage;
