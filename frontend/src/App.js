import React, { useState } from 'react';
import BrandSelector from './components/brandSelector';
import PriceSelector from './components/priceSelector';
import NameSelector from './components/nameSelector';
import './App.css';

const fashionBrandSelectDivName = "brandSelectDiv";
const priceSelectDivName = "priceSelectDiv";
const nameSelectDivName = "nameSelectDiv";

const showBrandFilter = () => {
	let div = document.getElementById(fashionBrandSelectDivName);
	if (div !== null) {
		div.style.visibility = div.style.visibility === 'visible'? 'collapse': 'visible';
	}
}

const showPriceFilter = () => {
	let div = document.getElementById(priceSelectDivName);
	if (div !== null) {
		div.style.visibility = div.style.visibility === 'visible'? 'collapse': 'visible';
	}
}

const App = () => {
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

	const getItems = () => {
		return (!isSearching ?
			(<div className='col' style={{ textAlign: 'center', alignContent: 'center' }}>
				Searched items will show up here!
			</div>) :
			(<div className='col' style={{ textAlign: 'center', alignContent: 'center' }}>
				temp, is searching
			</div>)
			
		)
	}

	const search = () => {
		
	}

	return (
		<html>
			<body style={{ padding: '30px', top: 0, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
				<div className='row'>
					<div className='col'>
						<h1>Genie</h1>
					</div>
				</div>
				<div className='row' style={{ height: '100%' }}>
					<div className='col half-col'>
						<h2>Fashion</h2>
						<table className='table'>
							<thead>
								<tr>
									<th style={{ position: 'relative' }}>
										<h3 style={{ position: 'absolute', top: 15, left: 15 }}>Brands</h3>
									</th>
									<th>
										<div id={ fashionBrandSelectDivName } style={{ visibility: 'visible' }}>
											<BrandSelector />
										</div>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>
										<h3>Price</h3>
									</th>
									<th>
										<div id={ priceSelectDivName } style={{ visibility: 'visible' }}>
											<PriceSelector />
										</div>
									</th>
								</tr>
								<tr>
									<th>
										<h3>Item Name</h3>
									</th>
									<th>
										<div id={ nameSelectDivName }>
											<NameSelector />
										</div>
									</th>
								</tr>
							</tbody>
						</table>

						<div className='row'>
							<div style={{ paddingRight: '5px' }}>
								<button className='btn btn-success' id="searchBtn" onClick={ search }>Search</button>
							</div>
							<button className='btn btn-secondary' id="resetBtn">Reset</button>
						</div>
					</div>

					{ getItems() }
					
				</div>
				
			</body>
		</html>
	);

}

export default App;
