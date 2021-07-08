import React, { useContext } from 'react';
import { auth } from '../firebase';
import AppContext from '../Context/AppContext';
import {
	Apps,
	ArrowDropDown,
	Chat,
	Computer,
	Group,
	Home,
	Notifications,
	Search,
	SportsEsports,
	Store,
} from '@material-ui/icons';

import './Header.css';
import { useHistory } from 'react-router-dom';

function Header() {
	const [{ user }, dispatch] = useContext(AppContext);

	const firstName = user?.displayName.split(' ')[0];

	const signOut = () => {
		auth.signOut();
		dispatch({ type: 'SET_USER', payload: { user: null } });
	};

	return (
		<div className='header'>
			<div className='header__left'>
				<img
					src='https://image.flaticon.com/icons/png/512/1312/1312139.png'
					alt=''
				/>
				<div className='header__searchBox'>
					<Search />
					<input type='text' placeholder='Search Facebook' />
				</div>
			</div>

			{/* center */}
			<div className='header__center'>
				<Home className='header__iconActive' />
				<Computer />
				<Store />
				<Group />
				<SportsEsports />
			</div>

			{/* right */}
			<div className='header__right'>
				<div className='profileBox' onClick={signOut}>
					<img src={user?.photoURL} alt='' />
					<p>{firstName}</p>
				</div>

				<div className='header__rightIcon'>
					<Apps />
					<Chat />
					<Notifications />
					<ArrowDropDown />
				</div>
			</div>
		</div>
	);
}

export default Header;
