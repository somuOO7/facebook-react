import React, { useContext, useRef, useState } from 'react';
import firebase from 'firebase';
import AppContext from '../Context/AppContext';
import { db, storage } from '../firebase';
import Collapse from '@material-ui/core/Collapse';
import { Alert } from '@material-ui/lab';
import {
	Cancel,
	InsertEmoticon,
	PhotoLibrary,
	VideoCall,
} from '@material-ui/icons';
import './AddPost.css';
import { IconButton } from '@material-ui/core';

function AddPost() {
	const [{ user }, dispatch] = useContext(AppContext);
	const [postMessage, setPostMessage] = useState('');
	const [postImage, setPostImage] = useState('');
	const [alertErrorOpen, setAlertErrorOpen] = useState(false);
	const [alertSuccessOpen, setAlertSuccessOpen] = useState(false);
	const inputPhotoRef = useRef(null);

	const firstName = user?.displayName.split(' ')[0];

	const addPostImage = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setPostImage(readerEvent.target.result);
		};
	};

	const submitPost = (e) => {
		e.preventDefault();

		if (postMessage || postImage) {
			db.collection('posts')
				.add({
					name: user.displayName,
					email: user.email,
					message: postMessage,
					profilePhoto: user.photoURL,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				})
				.then((doc) => {
					if (postImage) {
						const uploadTask = storage
							.ref(`posts/${doc.id}`)
							.putString(postImage, 'data_url');

						setPostImage('');

						uploadTask.on(
							'state_change',
							null,
							(err) => console.log(err),
							() => {
								storage
									.ref(`posts/${doc.id}`)
									.getDownloadURL()
									.then((url) => {
										db.collection('posts')
											.doc(doc.id)
											.set(
												{ postImage: url },
												{ merge: true }
											);
									});
							}
						);
					}
				});

			setPostMessage('');

			setAlertSuccessOpen(true);
			setTimeout(() => {
				setAlertSuccessOpen(false);
			}, 5000);
		} else {
			setAlertErrorOpen(true);
			setTimeout(() => {
				setAlertErrorOpen(false);
			}, 5000);
		}
	};

	return (
		<div className='addpost'>
			<div className='alertBox'>
				<Collapse in={alertErrorOpen}>
					<Alert variant='filled' severity='error'>
						Please enter a message or upload an image
					</Alert>
				</Collapse>
				<Collapse in={alertSuccessOpen}>
					<Alert variant='filled' severity='success'>
						Posted successfully
					</Alert>
				</Collapse>
			</div>

			<div className='addpost__top'>
				<img src={user?.photoURL} alt='' />
				<form onSubmit={submitPost}>
					<input
						value={postMessage}
						onChange={(e) => setPostMessage(e.target.value)}
						type='text'
						placeholder={`What's on your mind, ${firstName}?`}
					/>
					<button hidden type='submit'>
						Submit
					</button>
				</form>
			</div>

			{postImage && (
				<div className='postImage'>
					<img src={postImage} alt='' />

					<IconButton
						onClick={() => {
							setPostImage('');
						}}
						className='postImage__closebtn'
					>
						<Cancel />
					</IconButton>
				</div>
			)}

			<div className='addpost__bottom'>
				<div style={{ color: '#F02849' }}>
					<VideoCall />
					<p>Live Video</p>
				</div>

				<div
					onClick={() => inputPhotoRef.current.click()}
					style={{ color: '#45BD62' }}
				>
					<PhotoLibrary />
					<p>Photo/Video</p>
					<input
						onChange={addPostImage}
						ref={inputPhotoRef}
						type='file'
						hidden
					/>
				</div>

				<div className='addpost__activity' style={{ color: '#F7B928' }}>
					<InsertEmoticon />
					<p>Feeling/Activity</p>
				</div>
			</div>
		</div>
	);
}

export default AddPost;
