import React from 'react';

const MovieCardComponent = ({ movieObj, onClickEvent, hideMovieDesc }) => {
	return (
		<button
			onClick={() => (onClickEvent ? onClickEvent(movieObj) : null)}
			className=' md:w-1/6 w-full m-4 border rounded-lg'
		>
			<div
				className={`bg-gray-100 rounded-t-lg ${
					hideMovieDesc && 'rounded-b-lg'
				} flex justify-center align-middle`}
			>
				<img
					alt='moviePoster'
					src={`https://image.tmdb.org/t/p/w500/${movieObj?.poster_path}`}
					className='h-64 w-56 max-w-max '
				/>
			</div>
			{!hideMovieDesc && (
				<div className='flex flex-col p-2'>
					<div className='flex justify-between'>
						<span className='font-semibold text-slate-600'>
							{movieObj?.title}
						</span>
						<span className='text-gray-500'>{movieObj?.vote_average}</span>
					</div>
					<span className='mb-7 italic font-thin text-left line-clamp-2 overflow-hidden text-ellipsis'>
						{movieObj?.overview}
					</span>
				</div>
			)}
		</button>
	);
};

export default MovieCardComponent;
