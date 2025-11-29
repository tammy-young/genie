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
import Wishes from './pages/user/wishes.js';

import constants from './constants.js';
import IdSearch from './pages/search/idSearch.js';
import NavBar from './components/navBar.js';
import NavMenu from './components/navMenu.js';

const App = () => {
	return (
		<div className='dark:bg-neutral-900 dark:text-neutral-100'>
			<Router>
				<Routes>
					<Route path={constants.paths.FASHION} element={
						<div className="min-h-dvh flex flex-col">
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<FashionSearch />
						</div>
					} />
					<Route path={constants.paths.INTERIOR} element={
						<div className="min-h-dvh flex flex-col">
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<InteriorSearch />
						</div>
					} />
					<Route path={constants.paths.JEWELRY} element={
						<div className="min-h-dvh flex flex-col">
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<JewelrySearch />
						</div>
					} />
					<Route path={constants.paths.HAIR} element={
						<div className="min-h-dvh flex flex-col">
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<HairSearch />
						</div>
					} />
					<Route path={constants.paths.ID_SEARCH} element={
						<div className="min-h-dvh flex flex-col">
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<IdSearch />
						</div>
					} />
					<Route path="/login" element={
						<Login />
					} />
					<Route path="/signup" element={
						<Signup />
					} />
					<Route path="/profile" element={
						<div className="min-h-dvh flex flex-col">
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<Profile />
						</div>
					} />
					<Route path="/wishes" element={
						<div className="min-h-dvh flex flex-col">
							<div className='md:block hidden'><NavBar /></div>
							<div className='md:hidden block'><NavMenu /></div>
							<Wishes />
						</div>
					} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
