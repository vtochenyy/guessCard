import React, { useEffect, useMemo, useRef, useState } from 'react';
import GameCeil from '../gameCeil/gameCeil';
import styles from './style.module.css';

const genericGame = (filedSize) => {
	const gameCeils = [];
	for (let i = 0; i < filedSize; i++) {
		let j = i + 1;
		gameCeils.push({
			value: Math.floor(Math.random() * (4 - 1) + 1),
			id: j,
			isVisible: false,
		});
	}
	return gameCeils;
};
const GameField = () => {
	const [successCounter, setSuccessCounter] = useState(
		JSON.parse(sessionStorage.getItem('successCounter'))
	);
	const [gameState, setGameState] = useState([]);
	const [gameFiled, setGameFiled] = useState([]);
	const [gameResult, setGameResult] = useState('');

	const refSuccessCounter = useRef();
	const refGgameFieldContainer = useRef();

	const animateSuccesCounterIncrement = () => {
		refSuccessCounter.current.animate(
			[
				{
					border: '1px solid blueviolet',
					color: 'blueviolet',
					transform: 'scale(1)',
				},
				{
					border: '1px solid blueviolet',
					color: 'blueviolet',
					transform: 'scale(1)',
				},
				{
					border: '1px solid gold',
					color: 'gold',
					transform: 'scale(1.2)',
				},
				{
					border: '1px solid blueviolet',
					color: 'blueviolet',
					transform: 'scale(1)',
				},
				{
					border: '1px solid blueviolet',
					color: 'blueviolet',
					transform: 'scale(1)',
				},
			],
			{
				duration: 600,
				animationFillMode: 'ease',
			}
		);

		// refGgameFieldContainer.current.animate(
		// 	[
		// 		{
		// 			backgroundColor: 'rgb(140, 140, 184)',
		// 		},
		// 		{
		// 			backgroundColor: 'gold',
		// 		},
		// 		{
		// 			backgroundColor: 'cyan',
		// 		},
		// 		{
		// 			backgroundColor: 'gold',
		// 		},
		// 		{
		// 			backgroundColor: 'rgb(140, 140, 184)',
		// 		},
		// 	],
		// 	{
		// 		duration: 1500,
		// 		animationFillMode: 'ease',
		// 	}
		// );
	};

	useEffect(() => {
		setGameFiled(genericGame(12));
	}, []);

	useMemo(() => {
		sessionStorage.setItem('successCounter', successCounter);
	}, [successCounter]);

	useMemo(() => {
		if (gameState.length === 2 && gameState[0] === gameState[1]) {
			setGameResult('Получилось!');
			setSuccessCounter((prev) => {
				return prev + 1;
			});
			setTimeout(() => {
				setGameResult('');
				setGameFiled(genericGame(12));
				setGameState([]);
			}, 3000);
			successCounter > 0 && animateSuccesCounterIncrement();
		} else if (gameState.length === 2 && gameState[0] !== gameState[1]) {
			setGameResult('Это фиаско, попробуй ещё раз!');
			setTimeout(() => {
				setGameResult('');
				setGameFiled(genericGame(12));
				setGameState([]);
			}, 3000);
		}
	}, [gameFiled]);

	return (
		<div className={styles.container}>
			{!!successCounter && (
				<span ref={refSuccessCounter} className={styles.successCounter}>
					Количество успешных попыток: {sessionStorage.getItem('successCounter')}
				</span>
			)}
			{!gameResult && (
				<span className={styles.about}>Попробуй найти 2 одинаковые карточки!</span>
			)}
			<span className={styles.gameResult}>{gameResult}</span>
			<div ref={refGgameFieldContainer} className={styles.gameField_container}>
				{gameFiled.map((el) => (
					<GameCeil
						key={el.id}
						stateValue={el.value}
						isVisible={el.isVisible}
						id={el.id}
						gameState={gameState}
						setGameState={setGameState}
						setGameFiled={setGameFiled}
					/>
				))}
			</div>
		</div>
	);
};

export default React.memo(GameField);
