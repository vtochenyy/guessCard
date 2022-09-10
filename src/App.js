import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GameField from './components/gameField/gameField';
import { useEffect } from 'react';

function App() {
	const navigate = useNavigate();
	useEffect(() => navigate('/main', { replace: true }), []);

	return (
		<div className={styles.app_container}>
			<Routes>
				<Route path='/main' element={<GameField />} />
			</Routes>
		</div>
	);
}

export default App;
