import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();
	const [gameState, setGameState] = useState([]);
	const [gameFiled, setGameFiled] = useState([]);
	const [gameResult, setGameResult] = useState('');
	useEffect(() => {
		setGameFiled(genericGame(12));
	}, []);
	useMemo(() => {
		if (gameState.length === 2 && gameState[0] === gameState[1]) {
			setGameResult('Получилось!');
			setTimeout(() => {
				navigate('/guessCard/');
			}, 3000);
		} else if (gameState.length === 2 && gameState[0] !== gameState[1]) {
			setGameResult('Это фиаско, попробуй ещё раз!');
			setTimeout(() => {
				navigate('/guessCard/');
			}, 3000);
		}
	}, [gameState, navigate]);
	return (
		<div className={styles.container}>
			{!gameResult && (
				<span className={styles.about}>Попробуй найти 2 одинаковые карточки!</span>
			)}
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
