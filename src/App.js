import { Routes, Route } from 'react-router-dom';
import HomePage from './screen/HomePage';
import MovieDetailsPage from './screen/MovieDetailsPage';

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/MovieDetails' element={<MovieDetailsPage />} />
			</Routes>
		</div>
	);
}

export default App;
