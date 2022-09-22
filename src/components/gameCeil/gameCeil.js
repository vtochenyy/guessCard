import React from 'react';
import styles from './style.module.css';

const GameCeil = ({
	stateValue,
	isVisible,
	isGlobalDisabled,
	setGameState,
	setGameFiled,
	isGolden,
	id,
}) => {
	const handleClick = () => {
		setGameState((prev) => {
			let bufferState = [...prev];
			bufferState.push(stateValue);
			return bufferState;
		});
		setGameFiled((prev) => {
			return prev.map((el) => {
				return el.id === id ? { ...el, isVisible: true } : { ...el };
			});
		});
	};

	return isVisible ? (
		<div className={isGolden ? styles.isGolden : styles.gameCeil_container}>
			{stateValue}
		</div>
	) : (
		<div
			onClick={() => !isGlobalDisabled && handleClick()}
			className={styles.gameCeil_container}
		></div>
	);
};

export default React.memo(GameCeil);
