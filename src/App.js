import styles from './app.module.css';
import GameField from './components/gameField/gameField';

function App() {
	return (
		<div className={styles.app_container}>
			<GameField />
		</div>
	);
}

export default App;
