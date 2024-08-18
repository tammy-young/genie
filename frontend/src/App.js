import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

import Search from './pages/search.js';
import constants from './constants.js';
import IdSearch from './pages/idSearch.js';
import NavBar from './components/navBar.js';


const App = () => {

	const getBrands = async () => {
		try {
			const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);
            let brandsIdToName = response.data.brandsIdToName;
            let brandsNameToId = response.data.brandsNameToId;
            let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
            let brandsNameToIdHidden = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
            if (brandsIdToNameHidden !== null && brandsNameToIdHidden !== null) {
                brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);
                brandsNameToIdHidden.innerHTML = JSON.stringify(brandsNameToId);
            }
		} catch (error) {
			console.error('Error fetching brands:', error);
		}
	};

    useEffect(() => {
		getBrands();
	}, []);

	return (
		<div style={{ paddingLeft: '100px', paddingRight: '100px', paddingTop: '10px' }}>
			<Router>
				<NavBar />
				<Routes>
					<Route path={ constants.paths.SEARCH } element={ <Search /> } />
					<Route path={ constants.paths.ID_SEARCH } element={ <IdSearch /> } />
				</Routes>
				<div style={{ display: "none" }} id={ constants.divIds.BRANDS_NAME_TO_ID }></div>
				<div style={{ display: "none" }} id={ constants.divIds.BRANDS_ID_TO_NAME }></div>
			</Router>
		</div>
	);
}

export default App;
