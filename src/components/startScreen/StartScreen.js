import { Link } from 'react-router-dom';
import styles from './style.module.css';

const StartScreen = () => {
	return (
		<>
			<video
				className={styles.videoIntro}
				src='https://ru-wotp.wgcdn.co/static/5.110.0_53fd1f/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/video-bg.mp4'
				preload
				tabIndex='-1'
				disablePictureInPicture
				autoPlay
				muted
				loop
			></video>
			<Link className={styles.startGame} to='/guessCard/play'>
				<span className={styles.startGameText}>Начать игру</span>
			</Link>
		</>
	);
};

export default StartScreen;
