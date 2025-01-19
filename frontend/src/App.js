import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FashionSearch from './pages/fashion.js';
import InteriorSearch from './pages/interior.js';
import constants from './constants.js';
import IdSearch from './pages/idSearch.js';
import NavBar from './components/navBar.js';

const App = () => {
	return (
		<div className='site-padding'>
			<Router>
				<NavBar />
				<Routes>
					<Route path={ constants.paths.FASHION } element={ <FashionSearch /> } />
					<Route path={ constants.paths.INTERIOR } element={ <InteriorSearch /> } />
					<Route path={ constants.paths.ID_SEARCH } element={ <IdSearch /> } />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
