import React, { useState } from 'react';
import MovieCardComponent from '../component/MovieCard';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
	const navigate = useNavigate();

	const goToMovieDetails = () => {
		navigate('/MovieDetails');
	};

	const [searchedText, setSearchedText] = useState('');

	const onTyping = (text) => {
		setSearchedText(text.target.value);
	};

	return (
		<>
			<div className='flex justify-between p-3 border-b-2 shadow-sm items-center'>
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
			<div className='md:flex md:justify-around md:flex-wrap'>
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
				<MovieCardComponent onClickEvent={goToMovieDetails} />
			</div>
		</>
	);
};

export default HomePage;
