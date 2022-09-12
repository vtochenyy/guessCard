import React from 'react';
import styles from './style.module.css';

const GameCeil = ({
	stateValue,
	isVisible,
	setGameState,
	gameState,
	setGameFiled,
	id,
	handleResult,
}) => {
	const handleClick = () => {
		setGameState((prev) => {
			let bufferState = [...prev];
			bufferState.push(stateValue);
			console.log(bufferState);
			return bufferState;
		});
		setGameFiled((prev) => {
			return prev.map((el) => {
				return el.id === id ? { ...el, isVisible: true } : { ...el };
			});
		});
		handleResult();
	};

	return isVisible ? (
		<div className={styles.gameCeil_container}>{stateValue}</div>
	) : (
		<div
			onClick={() => gameState.length < 2 && handleClick()}
			className={styles.gameCeil_container}
		></div>
	);
};

export default React.memo(GameCeil);
