import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Page404 = () => {
	return (
		<Result
			status='404'
			title='404'
			subTitle='Sorry, the page you visited does not exist.'
			extra={
				<Link to='/guessCard'>
					<Button style={{ borderRadius: '20px' }} type='primary'>
						Back Home
					</Button>
				</Link>
			}
		/>
	);
};

export default Page404;
