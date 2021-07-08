import React from 'react';
import StoryCard from './StoryCard';
import './Stories.css';

const stories = [
	{
		name: 'Jon Snow',
		profile:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Kit_Harington_SDCC_2013_%28cropped%29.jpg/255px-Kit_Harington_SDCC_2013_%28cropped%29.jpg',
		story: 'https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png',
	},
	{
		name: 'Tyrion Lannister',
		profile:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Peter_Dinklage_by_Gage_Skidmore.jpg/330px-Peter_Dinklage_by_Gage_Skidmore.jpg',
		story: 'https://upload.wikimedia.org/wikipedia/en/5/50/Tyrion_Lannister-Peter_Dinklage.jpg',
	},
	{
		name: 'Sansa Stark',
		profile:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sophie_Turner_by_Gage_Skidmore_3.jpg/255px-Sophie_Turner_by_Gage_Skidmore_3.jpg',
		story: 'https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg',
	},
	{
		name: 'Jaime Lannister',
		profile:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Nikolaj_Coster-Waldau_by_Gage_Skidmore_2.jpg/361px-Nikolaj_Coster-Waldau_by_Gage_Skidmore_2.jpg',
		story: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Jaime_Lannister-Nikolaj_Coster-Waldau.jpg',
	},
	{
		name: 'Cersei Lannister',
		profile:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Lena_Headey_Primetime_Emmy_Awards_2014.jpg/319px-Lena_Headey_Primetime_Emmy_Awards_2014.jpg',
		story: 'https://upload.wikimedia.org/wikipedia/en/2/22/Cersei_Lannister_in_Black_Dress_in_Season_5.jpg',
	},
	{
		name: 'Arya Stark',
		profile:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Maisie_Williams_by_Gage_Skidmore_3.jpg/367px-Maisie_Williams_by_Gage_Skidmore_3.jpg',
		story: 'https://upload.wikimedia.org/wikipedia/en/3/39/Arya_Stark-Maisie_Williams.jpg',
	},
];

function Stories() {
	return (
		<div className='stories scrollbar-hidden'>
			{stories.map((story) => (
				<StoryCard
					key={story.profile}
					name={story.name}
					profile={story.profile}
					story={story.story}
				/>
			))}
		</div>
	);
}

export default Stories;
