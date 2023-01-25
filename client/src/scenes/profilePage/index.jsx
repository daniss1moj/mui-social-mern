import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const { userId } = useParams();
	const token = useSelector((state) => state.token);
	const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

	const getUser = async () => {
		const response = await fetch(`http://localhost:3001/users/${userId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		setUser(data);
	};

	useEffect(() => {
		getUser();
	}, []);

	if (!user) {
		return null;
	}

	return (
		<Box>
			<Navbar />
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? 'flex' : 'block'}
				gap="2rem"
				justifyContent="space-center">
				<Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
					<UserWidget userId={user._id} picturePath={user.picturePath} />
					<Box m="2rem 0">
						<FriendListWidget userId={userId} />
					</Box>
				</Box>
				<Box
					flexBasis={isNonMobileScreens ? '42%' : undefined}
					mt={isNonMobileScreens ? undefined : '2rem'}>
					<PostsWidget userId={user._id} isProfile={true} />
				</Box>
			</Box>
		</Box>
	);
};

export default ProfilePage;
