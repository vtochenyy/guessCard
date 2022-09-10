import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import GameField from './components/gameField/gameField';

function App() {
	return (
		<div className={styles.app_container}>
			<Routes>
				<Route path='/guessCard/' element={<GameField />} />
			</Routes>
		</div>
	);
}

export default App;
