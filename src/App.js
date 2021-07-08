import React, { useEffect, useReducer } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useHistory,
} from 'react-router-dom';
import AppContext from './Context/AppContext';
import { reducer } from './reducer/reducer';
import Login from './Components/Login';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widget from './Components/Widget';
import './App.css';

function App() {
	const history = useHistory();
	const [state, dispatch] = useReducer(reducer, {
		user: null,
	});

	const value = [state, dispatch];

	useEffect(() => {
		console.log(state);
	}, [state]);

	if (!state.user) {
		history.push('/login');
	}

	return (
		<AppContext.Provider value={value}>
			<Switch>
				<Route path='/login'>
					<Login />
				</Route>

				<Route path='/'>
					<div className='app'>
						<Header />

						<main>
							<Sidebar />
							<Feed />
							<Widget />
						</main>
					</div>
				</Route>
			</Switch>
		</AppContext.Provider>
	);
}

export default App;
