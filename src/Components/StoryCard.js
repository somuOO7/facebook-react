import React from 'react';
import './StoryCard.css';

function StoryCard({ name, profile, story }) {
	return (
		<div className='storyCard'>
			<div
				className='storyCard__background'
				style={{ backgroundImage: `url(${story})` }}
			></div>
			<div
				className='storyCard__profile'
				style={{ backgroundImage: `url(${profile})` }}
			></div>
			<p>{name}</p>
		</div>
	);
}

export default StoryCard;
