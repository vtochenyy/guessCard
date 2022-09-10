import { Link } from 'react-router-dom';
import styles from './style.module.css';

const StartScreen = () => {
	return (
		<Link className={styles.startGame} to='/guessCard/play'>
			<span className={styles.startGameText}>Начать игру</span>
		</Link>
	);
};

export default StartScreen;
