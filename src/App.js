import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FashionSearch from './pages/fashion.js';
import InteriorSearch from './pages/interior.js';
import JewelrySearch from './pages/jewelry.js';
import HairSearch from './pages/hair.js';
import constants from './constants.js';
import IdSearch from './pages/idSearch.js';
import NavBar from './components/navBar.js';
import NavMenu from './components/navMenu.js';

const App = () => {
	return (
		<div className='site-padding dark:bg-neutral-900 dark:text-neutral-100'>
			<Router>
				<div className='md:block hidden'>
					<NavBar />
				</div>
				<div className='md:hidden block'>
					<NavMenu />
				</div>

				<Routes>
					{/* <Route index path="/" element={<Index />} /> */}
					<Route path={constants.paths.FASHION} element={<FashionSearch />} />
					<Route path={constants.paths.INTERIOR} element={<InteriorSearch />} />
					<Route path={constants.paths.JEWELRY} element={<JewelrySearch />} />
					<Route path={constants.paths.HAIR} element={<HairSearch />} />
					<Route path={constants.paths.ID_SEARCH} element={<IdSearch />} />
				</Routes>
			</Router>
			<div style={{ display: "none" }} id={constants.divIds.BRANDS_ID_TO_NAME}></div>
			<div style={{ display: "none" }} id={constants.divIds.EXCLUDED_BRANDS_DIV}></div>
		</div>
	);
}

export default App;
