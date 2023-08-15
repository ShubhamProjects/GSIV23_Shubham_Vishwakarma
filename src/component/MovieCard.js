import React from 'react';

const MovieCardComponent = ({ onClickEvent, hideMovieDesc }) => {
	return (
		<button
			onClick={() => (onClickEvent ? onClickEvent() : null)}
			className=' md:w-1/6 w-full m-4 border rounded-lg'
		>
			<div
				className={`bg-gray-100 rounded-t-lg ${
					hideMovieDesc && 'rounded-b-lg'
				} flex justify-center align-middle`}
			>
				<img
					alt='moviePoster'
					src={require('../logo192.png')}
					className='h-auto w-auto'
				/>
			</div>
			{!hideMovieDesc && (
				<div className='flex flex-col'>
					<div className='flex justify-between'>
						<span>Movie Title</span>
						<span>Rating</span>
					</div>
					<span className='justify-start flex'>Description</span>
				</div>
			)}
		</button>
	);
};

export default MovieCardComponent;
