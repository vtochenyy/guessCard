import { useEffect, useMemo, useState } from 'react';
import GameCeil from '../gameCeil/gameCeil';
import styles from './style.module.css';

const genericGame = (filedSize) => {
	const gameCeils = [];
	for (let i = 0; i < filedSize; i++) {
		gameCeils.push(Math.floor(Math.random() * (4 - 1) + 1));
	}
	return gameCeils;
};

const GameField = () => {
	const [gameState, setGameState] = useState([]);
	const [gameFiled, setGameFiled] = useState([]);
	const [gameResult, setGameResult] = useState('');
	useEffect(() => {
		setGameFiled(genericGame(9));
	}, []);
	useMemo(() => {
		if (gameState.length === 2 && gameState[0] === gameState[1]) {
			setGameResult('Win!');
			setTimeout(() => window.location.reload(), 5000);
		} else if (gameState.length === 2 && gameState[0] !== gameState[1]) {
			setGameResult('Lose!');
			setTimeout(() => window.location.reload(), 3000);
		}
	}, [gameState]);
	return (
		<div className={styles.container}>
			<span className={styles.gameResult}>{gameResult}</span>
			{/* <span>{JSON.stringify(gameState)}</span> */}
			<div className={styles.gameField_container}>
				{gameFiled.map((el) => (
					<GameCeil stateValue={el} gameState={gameState} setGameState={setGameState} />
				))}
			</div>
		</div>
	);
};

export default GameField;
