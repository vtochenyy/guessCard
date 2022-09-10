import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GameField from './components/gameField/gameField';
import StartScreen from './components/startScreen/StartScreen';
import { useEffect } from 'react';

function App() {
	return (
		<div className={styles.app_container}>
			<Routes>
				<Route path='/guessCard/' element={<StartScreen />} />
				<Route path='/guessCard/play' element={<GameField />} />
			</Routes>
		</div>
	);
}

export default App;
