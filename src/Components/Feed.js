import React from 'react';
import Stories from './Stories';
import AddPost from './AddPost';
import Posts from './Posts';
import './Feed.css';

function Feed() {
	return (
		<div className='feed scrollbar-hidden'>
			<Stories />

			<AddPost />

			<Posts />
		</div>
	);
}

export default Feed;
