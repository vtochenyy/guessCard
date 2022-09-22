import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import CrossNull from '../../pages/crossNull/CrossNullPage';
import { GameTypes } from '../../variables/GameTypes';
import styles from './style.module.css';

const StartScreen = () => {
	const appContext = useContext(AppContext);
	useEffect(() => console.log(appContext));
	return !appContext.game ? (
		<span
			onClick={() => appContext.setGame(GameTypes.GUESS_SQUARE)}
			className={styles.startGameText}
		>
			Начать игру в квадратики
		</span>
	) : (
		<>
			<CrossNull />
		</>
	);
};

export default StartScreen;
