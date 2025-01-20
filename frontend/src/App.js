import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FashionSearch from './pages/fashion.js';
import InteriorSearch from './pages/interior.js';
import constants from './constants.js';
import IdSearch from './pages/idSearch.js';
import NavBar from './components/navBar.js';
// import Index from './pages/index.js';

const App = () => {
	return (
		<div className='site-padding !h-screen !max-h-screen'>
			<Router>
				<NavBar />
				<Routes>
					{/* <Route index path="/" element={<Index />} /> */}
					<Route path={constants.paths.FASHION} element={<FashionSearch />} />
					<Route path={constants.paths.INTERIOR} element={<InteriorSearch />} />
					<Route path={constants.paths.ID_SEARCH} element={<IdSearch />} />
				</Routes>
			</Router>
			<div style={{ display: "none" }} id={constants.divIds.BRANDS_NAME_TO_ID}></div>
			<div style={{ display: "none" }} id={constants.divIds.BRANDS_ID_TO_NAME}></div>
			<div style={{ display: "none" }} id={constants.divIds.EXCLUDED_BRANDS_DIV}></div>
		</div>
	);
}

export default App;
