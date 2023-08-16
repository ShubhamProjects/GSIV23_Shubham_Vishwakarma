import React, { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieCardComponent from '../component/MovieCard';

const MovieDetailsPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { movieObj } = state;

	const [details, setDetails] = useState({});

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
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGUyZmNiMGY1ZTJmMGQyMjQyNzNlNTMwMzBiY2U3MSIsInN1YiI6IjY0ZGNmNmM2MzcxMDk3MDBjNTFkNWFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yCJdmDi1Y8_RwrTxonbIz5NBvZD7FIAt7acsdYYJ-50',
			},
		};

		await fetch(
			`https://api.themoviedb.org/3/movie/${movieObj?.id}?language=en-US`,
			options
		)
			.then((response) => response.json())
			.then((response) => setDetails(response))
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
					<span>{`${details?.title} (${details?.vote_average})`}</span>
					<span>{`${details?.release_date} | ${details?.runtime} | Director`}</span>
					<span>Cast: Actor1, Actor2, ...</span>
					<span>{details?.overview}</span>
				</div>
			</div>
		</>
	);
};

export default MovieDetailsPage;
