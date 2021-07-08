import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, db, provider } from '../firebase';

function Login() {
	const history = useHistory();
	const [state, dispatch] = useContext(AppContext);
	const loadingLogoRef = useRef(null);
	const signInBtnRef = useRef(null);

	const signIn = () => {
		loadingLogoRef.current.style.display = 'inline';
		auth.signInWithPopup(provider)
			.then((result) => {
				loadingLogoRef.current.style.display = 'none';
				dispatch({
					type: 'SET_USER',
					payload: { user: result.user },
				});

				signInBtnRef.current.style.backgroundColor = 'rgb(49, 228, 49)';

				db.collection('users').doc(result.user.email).set(
					{
						name: result.user.displayName,
						photoURL: result.user.photoURL,
					},
					{ merge: true }
				);

				setTimeout(() => {
					history.push('/');
				}, 1000);
			})
			.catch((error) => {
				loadingLogoRef.current.style.display = 'none';
				alert(error);
			});
	};

	return (
		<div className='login'>
			<img
				src='https://image.flaticon.com/icons/png/512/1312/1312139.png'
				alt=''
			/>
			<Button ref={signInBtnRef} onClick={signIn}>
				Join with
				<img
					className='login__btnLogo'
					src='https://image.flaticon.com/icons/png/512/2991/2991148.png'
					alt=''
				/>
				<div className='loader' ref={loadingLogoRef}></div>
			</Button>
		</div>
	);
}

export default Login;
