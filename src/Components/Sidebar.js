import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';
import {
	Bookmark,
	Computer,
	Event,
	Flag,
	Group,
	GroupWork,
	History,
	Store,
} from '@material-ui/icons';
import './Sidebar.css';

function Sidebar() {
	const [{ user }, dispatch] = useContext(AppContext);

	return (
		<div className='sidebar'>
			<div className='sidebar__memu'>
				<img src={user?.photoURL} alt='' />
				<p>{user?.displayName}</p>
			</div>

			<div className='sidebar__memu'>
				<Group />
				<p>Friends</p>
			</div>

			<div className='sidebar__memu'>
				<GroupWork />
				<p>Groups</p>
			</div>

			<div className='sidebar__memu'>
				<Store />
				<p>Marketplace</p>
			</div>

			<div className='sidebar__memu'>
				<Computer />
				<p>Watch</p>
			</div>

			<div className='sidebar__memu'>
				<Event />
				<p>Events</p>
			</div>

			<div className='sidebar__memu'>
				<History />
				<p>Memories</p>
			</div>

			<div className='sidebar__memu'>
				<Bookmark />
				<p>Saved</p>
			</div>

			<div className='sidebar__memu'>
				<Flag />
				<p>Pages</p>
			</div>
		</div>
	);
}

export default Sidebar;
