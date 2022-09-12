import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import CrossNull from './pages/crossNull/CrossNullPage';

function App() {
	!sessionStorage.getItem('successCounter') && sessionStorage.setItem('successCounter', 0);
	return (
		<div className={styles.app_container}>
			<Routes>
				<Route path='/guessCard/' element={<MainPage />} />
				<Route path='/guessCard/play' element={<CrossNull />} />
			</Routes>
		</div>
	);
}

export default App;
