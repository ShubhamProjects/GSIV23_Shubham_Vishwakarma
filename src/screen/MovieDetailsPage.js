import React, { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieCardComponent from '../component/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearMovieDetailResponse,
	getMovieDetailResponse,
	setMovieDetailResponse,
} from '../core/DataSlice';
import moment from 'moment/moment';

const MovieDetailsPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { movieObj } = state;

	const dispatch = useDispatch();
	const movieDetailResponse = useSelector(getMovieDetailResponse);

	const [details, setDetails] = useState({});

	useEffect(() => {
		if (movieDetailResponse) {
			setDetails(movieDetailResponse);
		}
		return () => dispatch(clearMovieDetailResponse());
	}, [movieDetailResponse]);

	const goToHomePage = () => {
		navigate(-1);
	};

	useEffect(() => {
		movieDetails();
	}, []);

	const movieDetails = async () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: process.env.REACT_APP_AUTH_TOKEN,
			},
		};

		await fetch(
			`${process.env.REACT_APP_BASE_URL}movie/${movieObj?.id}?language=en-US`,
			options
		)
			.then((response) => response.json())
			.then((response) => dispatch(setMovieDetailResponse(response)))
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div className='flex justify-between p-3 border-b-2 shadow-sm align-middle mr-3'>
				<h1 className='text-lg font-semibold'>Movie Details</h1>
				<HomeIcon
					className='h-6 w-6 text-black hover:cursor-pointer'
					onClick={goToHomePage}
				/>
			</div>

			<div className='md:flex'>
				<MovieCardComponent movieObj={details} hideMovieDesc={true} />
				<div className={`flex flex-col md:mt-4 ml-4 md:ml-0`}>
					<div className='flex mb-2'>
						<span className='mr-4 text-lg font-semibold'>{`${details?.title}`}</span>
						<span className='mr-4 font-mono'>{` (${details?.vote_average})`}</span>
					</div>
					<span className='mb-2'>{`${moment(details?.release_date).format(
						'YYYY'
					)} | ${moment
						.duration(details?.runtime, 'minutes')
						.asHours()
						.toFixed(2)} Hrs | Director`}</span>
					<span className='text-base'>Cast: Actor1, Actor2, ...</span>
					<span className='mt-3 font-serif'>{details?.overview}</span>
				</div>
			</div>
		</>
	);
};

export default MovieDetailsPage;
