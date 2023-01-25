import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
	SendOutlined,
} from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme, InputBase } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';
import UserImage from 'components/UserImage';

const PostWidget = ({
	postId,
	postUserId,
	name,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
}) => {
	const [isComments, setIsComments] = useState(false);
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const isLiked = Boolean(likes[loggedInUserId]);
	const likeCount = Object.keys(likes).length;
	const loggedInUserPicturePath = useSelector((state) => state.user.picturePath);

	const { palette } = useTheme();
	const main = palette.neutral.main;
	const primary = palette.primary.main;

	const patchLike = async () => {
		const response = await fetch(`${process.env.REACT_BASE_URL}/posts/${postId}/like`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ userId: loggedInUserId }),
		});

		const updatedPost = await response.json();
		dispatch(setPost({ post: updatedPost }));
	};

	const addComment = async () => {
		const response = await fetch(`${process.env.REACT_BASE_URL}/posts/${postId}/comments`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ comment }),
		});
		const updatedPost = await response.json();
		dispatch(setPost({ post: updatedPost }));
	};

	return (
		<WidgetWrapper m="2rem 0">
			<Friend
				friendId={postUserId}
				name={name}
				subtitle={location}
				userPicturePath={userPicturePath}
			/>
			<Typography color={main} sx={{ mt: '1rem' }}>
				{description}
			</Typography>
			{picturePath && (
				<Box mt="1rem">
					<img
						src={`${process.env.REACT_BASE_URL}/assets/${picturePath}`}
						alt="post"
						width="100%"
						height="auto"
					/>
				</Box>
			)}
			<FlexBetween mt="0.25rem">
				<FlexBetween gap="1rem">
					<FlexBetween gap="0.3rem">
						<IconButton onClick={() => patchLike()}>
							{isLiked ? (
								<FavoriteOutlined
									sx={{
										color: primary,
									}}
								/>
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography>{likeCount}</Typography>
					</FlexBetween>
					<FlexBetween gap="0.3rem">
						<IconButton onClick={() => setIsComments(!isComments)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>
				<IconButton>
					<ShareOutlined />
				</IconButton>
			</FlexBetween>
			{isComments && (
				<Box mt="0.5rem">
					{comments.map((comment, i) => {
						return (
							<Box key={`${name}-${i}`}>
								<Divider />
								<Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
									{comment}
								</Typography>
							</Box>
						);
					})}
					<WidgetWrapper>
						<FlexBetween gap="1rem">
							<UserImage size="40px" image={loggedInUserPicturePath} />

							<InputBase
								fullWidth
								placeholder="Comment post"
								onChange={(e) => setComment(e.target.value)}
								value={comment}
								sx={{
									width: '100%',
									backgroundColor: palette.neutral.light,
									borderRadius: '2rem',
									padding: '0.5rem 1rem',
								}}
							/>
							<IconButton
								onClick={() => {
									addComment();
									setComment('');
								}}>
								<SendOutlined />
							</IconButton>
						</FlexBetween>
					</WidgetWrapper>
				</Box>
			)}
		</WidgetWrapper>
	);
};

export default PostWidget;
