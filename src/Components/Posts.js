import React, { useEffect, useState } from 'react';

import { db } from '../firebase';
import './Posts.css';
import Post from './Post';

const Posts = () => {
	const [posts, setPosts] = useState(['']);

	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) =>
				setPosts(
					snapshot.docs.map((doc) => {
						return { postId: doc.id, data: doc.data() };
					})
				)
			);
	}, []);

	useEffect(() => {
		console.log(posts);
	}, [posts]);

	return (
		<div className='posts'>
			{!posts.length && (
				<div className='noPost'>
					<img
						src='https://image.flaticon.com/icons/png/512/2621/2621165.png'
						alt=''
					/>
					<h2>No Post Available</h2>
				</div>
			)}

			{posts.map((post) => (
				<Post
					key={post?.postId}
					id={post?.postId}
					name={post?.data?.name}
					email={post?.data?.email}
					profilePhoto={post?.data?.profilePhoto}
					message={post?.data?.message}
					timestamp={post?.data?.timestamp?.seconds}
					postImage={post?.data?.postImage}
					likes={post?.data?.likes}
				/>
			))}
		</div>
	);
};

export default Posts;
