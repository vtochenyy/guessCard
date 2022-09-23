import { Button } from 'antd';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import CrossNull from '../../pages/crossNull/CrossNullPage';
import { GameTypes } from '../../variables/GameTypes';
import styles from './style.module.css';

const StartScreen = () => {
	const appContext = useContext(AppContext);
	useEffect(() => console.log(appContext));
	return !appContext.game ? (
		<div className={styles.StartScreenContainer}>
			<Button
				type='primary'
				shape='round'
				size='large'
				className={styles.startGameText}
				onClick={() => appContext.setGame(GameTypes.GUESS_SQUARE)}
			>
				Начать игру в квадратики
			</Button>
			<Button
				type='primary'
				shape='round'
				size='large'
				className={styles.startGameText}
				onClick={() => appContext.setGame(GameTypes.GUESS_SQUARE)}
			>
				Начать игру в квадратики
			</Button>
			<Button
				type='primary'
				shape='round'
				size='large'
				className={styles.startGameText}
				onClick={() => appContext.setGame(GameTypes.GUESS_SQUARE)}
			>
				Начать игру в квадратики
			</Button>
		</div>
	) : (
		<>
			<CrossNull />
		</>
	);
};

export default StartScreen;
