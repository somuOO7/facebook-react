import React, { useContext, useState } from 'react';
import moment from 'moment';
import AppContext from '../Context/AppContext';
import { db } from '../firebase';
import firebase from 'firebase';
import {
	ChatBubbleOutline,
	Delete,
	MoreHoriz,
	Share,
	ThumbUpAlt,
	ThumbUpAltOutlined,
} from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';

import './Post.css';

function Post({
	id,
	name,
	profilePhoto,
	message,
	timestamp,
	postImage,
	email,
	likes,
}) {
	const [{ user }, dispatch] = useContext(AppContext);
	const [postMoreOp, setPostMoreOp] = useState('none');
	const [alertPostDeleted, setAlertPostDeleted] = useState(false);
	const [alertInvalidDeleted, setAlertInvalidDeleted] = useState(false);

	const deletePost = (deleteId, askedBy) => {
		if (user.email === askedBy) {
			let choice = window.confirm(
				'Are you sure you want to delete this post'
			);

			if (choice) {
				db.collection('posts')
					.doc(deleteId)
					.delete()
					.then(() => {
						setAlertPostDeleted(true);
						setTimeout(() => {
							setAlertPostDeleted(false);
						}, 5000);
					});
			}
		} else {
			setAlertInvalidDeleted(true);
			setTimeout(() => {
				setAlertInvalidDeleted(false);
			}, 5000);
		}
	};

	const addLike = () => {
		if (likes?.includes(user.email)) {
			db.collection('posts')
				.doc(id)
				.update({
					likes: firebase.firestore.FieldValue.arrayRemove(
						user.email
					),
				});
		} else {
			db.collection('posts')
				.doc(id)
				.update({
					likes: firebase.firestore.FieldValue.arrayUnion(user.email),
				});
		}
	};

	return (
		<div className='posts__post'>
			<div className='alertBox'>
				<Collapse in={alertPostDeleted}>
					<Alert variant='filled' severity='success'>
						Deleted Successfully!
					</Alert>
				</Collapse>
				<Collapse in={alertInvalidDeleted}>
					<Alert variant='filled' severity='error'>
						Please ask the creator of the post to delete the post
					</Alert>
				</Collapse>
			</div>
			<div className='post__header'>
				<img src={profilePhoto} alt='' />
				<div className='post__headerTitle'>
					<h4>{name}</h4>
					<p>{moment(timestamp * 1000).fromNow()}</p>
				</div>

				<div
					onMouseOver={() => {
						setPostMoreOp('inline-block');
					}}
					onMouseOut={() => {
						setPostMoreOp('none');
					}}
				>
					<MoreHoriz />

					<div
						style={{ display: `${postMoreOp}` }}
						className='post__headerMore'
					>
						<div
							style={{ color: 'red' }}
							onClick={() => {
								deletePost(id, email);
							}}
						>
							<Delete />
							<p>Move to Trash</p>
						</div>
					</div>
				</div>
			</div>

			<div className='post__message'>
				<p>{message}</p>
			</div>
			{postImage && (
				<div className='post__image'>
					<img src={postImage} alt='' />
				</div>
			)}

			<div className='post__footer'>
				{!likes?.length ? (
					''
				) : (
					<div className='post__footerTop'>
						<ThumbUpAlt />
						<p>{likes?.length}</p>
					</div>
				)}

				<div className='post__footerBottom'>
					<Button
						className={`likeBtn ${
							likes?.includes(user?.email) && 'likeBtnActive'
						}`}
						onClick={addLike}
					>
						<ThumbUpAltOutlined />
						Like
					</Button>

					<Button className='commentBtn'>
						<ChatBubbleOutline />
						Comment
					</Button>
					<Button className='shareBtn'>
						<Share />
						Share
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Post;
