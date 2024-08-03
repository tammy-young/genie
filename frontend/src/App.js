import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Search from './pages/search.js';
import constants from './constants.js';
import IdSearch from './pages/idSearch.js';
import NavBar from './components/navBar.js';

const App = () => {
	return (
		<div style={{ paddingLeft: '100px', paddingRight: '100px', paddingTop: '10px' }}>
			<Router>
				<NavBar />
				<Routes>
					<Route path={ constants.paths.SEARCH } element={ <Search /> } />
					<Route path={ constants.paths.ID_SEARCH } element={ <IdSearch /> } />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
