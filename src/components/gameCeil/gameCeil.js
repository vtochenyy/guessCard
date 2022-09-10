import { useState } from 'react';
import styles from './style.module.css';

const GameCeil = ({ stateValue, setGameState, gameState }) => {
	const handleClick = () => {
		setIsCeilVisible(true);
		setGameState((prev) => {
			let bufferState = [...prev];
			bufferState.push(stateValue);
			return bufferState;
		});
	};

	const [isCeilVisible, setIsCeilVisible] = useState(false);
	return isCeilVisible ? (
		<div className={styles.gameCeil_container}>{stateValue}</div>
	) : (
		<div
			onClick={() => gameState.length < 2 && handleClick()}
			className={styles.gameCeil_container}
		></div>
	);
};

export default GameCeil;
