import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import Page404 from './pages/page404/Page404';

function App() {
	!sessionStorage.getItem('successCounter') && sessionStorage.setItem('successCounter', 0);
	return (
		<div className={styles.app_container}>
			<Routes>
				<Route path='/guessCard/' element={<MainPage />} />
				<Route path='*' element={<Page404 />} />
			</Routes>
		</div>
	);
}

export default App;
