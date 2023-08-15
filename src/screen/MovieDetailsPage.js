import React from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import MovieCardComponent from '../component/MovieCard';

const MovieDetailsPage = () => {
	const navigate = useNavigate();

	const goToHomePage = () => {
		navigate(-1);
	};
	return (
		<div>
			<div className='flex justify-between p-3 border-b-2 shadow-sm align-middle'>
				<h1 className='text-lg font-semibold'>Movie Details</h1>
				<HomeIcon
					className='h-6 w-6 text-black hover:cursor-pointer'
					onClick={goToHomePage}
				/>
			</div>

			<div className='md:flex'>
				<MovieCardComponent hideMovieDesc={true} />
				<div className={`flex flex-col md:mt-4 ml-4 md:ml-0`}>
					<span>Movie Title (Rating)</span>
					<span>Year | Length | Director</span>
					<span>Cast: Actor1, Actor2, ...</span>
					<span>Description</span>
				</div>
			</div>
		</div>
	);
};

export default MovieDetailsPage;
