/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import GameCeil from '../gameCeil/gameCeil';
import { Popover, message, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import iconImg from '../../assets/images/8665357_coins_icon.png';
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
	const [isGlobalDisabled, setIsGlobalDisabled] = useState(false);
	const [open, setOpen] = useState(false);

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
			return genericGame(25, 6);
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
			setSuccessCounter((prev) => {
				return prev + 1;
			});
			setIsGlobalDisabled(true);
			message.success('Получилось!');
			setTimeout(() => {
				setGameFiled(startGame());
				setGameState([]);
				setIsGlobalDisabled(false);
			}, 3000);
			successCounter > 0 && animateSuccesCounterIncrement();
		}
	}, [gameFiled]);

	const handleDrawerVisible = () => {
		open ? setOpen(false) : setOpen(true);
	};

	return (
		<div className={styles.container}>
			<Button
				size='large'
				type='default'
				className={styles.menuButton}
				onClick={() => handleDrawerVisible()}
				icon={<MenuOutlined />}
			></Button>
			<Drawer
				title='Внутриигровое меню'
				placement='left'
				closable={false}
				onClose={handleDrawerVisible}
				open={open}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Drawer>
			<div className={styles.contianerToGameInfo}>
				{!!successCounter && (
					<span ref={refSuccessCounter} className={styles.successCounter}>
						Количество успешных попыток: {sessionStorage.getItem('successCounter')}
					</span>
				)}
				{!!successCounter && (
					<div className={styles.successCounter + '   ' + styles.coinsContainer}>
						<img src={iconImg} alt='img not found' />{' '}
						{sessionStorage.getItem('successCounter') ** 2}
					</div>
				)}
			</div>
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
