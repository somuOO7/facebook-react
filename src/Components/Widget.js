import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import './Widget.css';

function Widget() {
	const [contacts, setContacts] = useState(['']);

	useEffect(() => {
		db.collection('users')
			.orderBy('name', 'asc')
			.onSnapshot((snapshot) => {
				setContacts(snapshot.docs.map((doc) => doc.data()));
			});
	}, []);

	useEffect(() => {
		console.log(contacts);
	}, [contacts]);

	return (
		<div className='widget'>
			<div className='widget__header'>
				<h4>Contacts</h4>
			</div>

			<div className='widget__body'>
				{contacts?.map((contact) => (
					<div>
						<img src={contact.photoURL} alt='' />
						<p>{contact.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Widget;
