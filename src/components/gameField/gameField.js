import React, { useEffect, useMemo, useRef, useState } from 'react';
import GameCeil from '../gameCeil/gameCeil';
import { Popover } from 'antd';
import styles from './style.module.css';

const genericGame = (filedSize, maxNumber) => {
	const gameCeils = [];
	for (let i = 0; i < filedSize; i++) {
		let j = i + 1;
		gameCeils.push({
			value: Math.floor(Math.random() * (maxNumber - 1) + 1),
			id: j,
			isVisible: false,
			isGolden: false,
		});
	}
	return gameCeils;
};

// COMPONENT
const GameField = () => {
	const [successCounter, setSuccessCounter] = useState(
		JSON.parse(sessionStorage.getItem('successCounter'))
	);
	const [gameState, setGameState] = useState([]);
	const [gameFiled, setGameFiled] = useState([]);
	const [gameResult, setGameResult] = useState('');
	const [isGlobalDisabled, setIsGlobalDisabled] = useState(false);

	const refSuccessCounter = useRef();
	const refGgameFieldContainer = useRef();

	const startGame = () => {
		if (successCounter < 4) {
			return genericGame(12, 4);
		} else if (successCounter < 8) {
			refGgameFieldContainer.current.classList.add(styles.gameField_container_2);
			return genericGame(15, 5);
		} else if (successCounter < 12) {
			refGgameFieldContainer.current.classList.add(styles.gameField_container_3);
			return genericGame(24, 6);
		} else if (successCounter < 16) {
			refGgameFieldContainer.current.classList.add(styles.gameField_container_4);
			return genericGame(24, 6);
		} else {
			refGgameFieldContainer.current.classList.add(styles.gameField_container_4);
			return genericGame(25, 7);
		}
	};

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
				duration: 1000,
				animationFillMode: 'ease',
			}
		);
	};

	useEffect(() => {
		setGameFiled(startGame());
	}, []);

	useMemo(() => {
		sessionStorage.setItem('successCounter', successCounter);
	}, [successCounter]);

	useMemo(() => {
		let lastElement = [...gameState].pop();
		if (gameState.slice(0, -1).includes(lastElement)) {
			setGameResult('Получилось!');
			setSuccessCounter((prev) => {
				return prev + 1;
			});
			setIsGlobalDisabled(true);
			setTimeout(() => {
				setGameResult('');
				setGameFiled(startGame());
				setGameState([]);
				setIsGlobalDisabled(false);
			}, 3000);
			successCounter > 0 && animateSuccesCounterIncrement();
		} else if (gameState.length === 2 && gameState[0] !== gameState[1]) {
			setTimeout(() => {
				setGameResult('');
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
			{!!gameResult && <span className={styles.gameResult}>{gameResult}</span>}
			{!gameResult && (
				<Popover
					content={
						<div>
							<p>dsdsds</p>
						</div>
					}
					trigger='hover'
				>
					<span className={styles.about}>Попробуй найти 2 одинаковые карточки!</span>
				</Popover>
			)}
			<div ref={refGgameFieldContainer} className={styles.gameField_container}>
				{gameFiled.map((el) => (
					<GameCeil
						isGlobalDisabled={isGlobalDisabled}
						key={el.id}
						stateValue={el.value}
						isVisible={el.isVisible}
						id={el.id}
						isGolden={el.isGolden}
						setGameState={setGameState}
						setGameFiled={setGameFiled}
					/>
				))}
			</div>
		</div>
	);
};

export default React.memo(GameField);
