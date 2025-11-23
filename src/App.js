import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FashionSearch from './pages/search/fashion.js';
import InteriorSearch from './pages/search/interior.js';
import JewelrySearch from './pages/search/jewelry.js';
import HairSearch from './pages/search/hair.js';
import NotFound from './pages/404.js';
import Login from './pages/user/login.js';
import Signup from './pages/user/signup.js';
import Profile from './pages/user/profile.js';

import constants from './constants.js';
import IdSearch from './pages/search/idSearch.js';
import NavBar from './components/navBar.js';
import NavMenu from './components/navMenu.js';

const App = () => {
	return (
		<div className='dark:bg-neutral-900 dark:text-neutral-100 min-h-screen'>
			<Router>
				<Routes>
					<Route path={constants.paths.FASHION} element={
						<div>
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<div className='site-padding'><FashionSearch /></div>
						</div>
					} />
					<Route path={constants.paths.INTERIOR} element={
						<div>
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<div className='site-padding'><InteriorSearch /></div>
						</div>
					} />
					<Route path={constants.paths.JEWELRY} element={
						<div>
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<div className='site-padding'><JewelrySearch /></div>
						</div>
					} />
					<Route path={constants.paths.HAIR} element={
						<div>
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<div className='site-padding'><HairSearch /></div>
						</div>
					} />
					<Route path={constants.paths.ID_SEARCH} element={
						<div>
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<div className='site-padding'><IdSearch /></div>
						</div>
					} />
					<Route path="/login" element={
						<Login />
					} />
					<Route path="/signup" element={
						<Signup />
					} />
					<Route path="/profile" element={
						<div>
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<div className='site-padding'><Profile /></div>
						</div>
					} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
			<div style={{ display: "none" }} id={constants.divIds.BRANDS_ID_TO_NAME}></div>
			<div style={{ display: "none" }} id={constants.divIds.EXCLUDED_BRANDS_DIV}></div>
		</div>
	);
}

export default App;
