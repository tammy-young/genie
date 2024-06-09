import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from '@mui/icons-material/Search';

import GenieIcon from './components/images/genieLogo.js';
import Search from './pages/search.js';

const startSearchMessage = "Searched items will show up here!"


const getPage = (pageNumber) => {
	if (pageNumber == 0) {
		return(<Search />);
	}
}

const App = () => {

	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		getPage(currentPage)
	}, [currentPage]);

	return (
		<html>
			<body style={{ padding: '30px', top: 0, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
				<div className='row' style={{ marginTop:'-30px' }}>
					<div className='col' style={{ padding: '0px', textAlign: 'left', width: 'fit-content', maxWidth: 'fit-content' }}>
						<GenieIcon />
					</div>
					<div className='col' style={{ display: 'flex', alignItems: 'center' }}>
						<div onClick={() => { setCurrentPage(0) }} style={{ cursor: 'pointer' }}>
							Search <SearchIcon />
						</div>
					</div>
					
				</div>
				<div id="curr-page">
					{ getPage(currentPage) }
				</div>
			</body>
		</html>
	);
}

export default App;
