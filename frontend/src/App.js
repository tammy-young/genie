import React, { useState, useEffect } from 'react';
import BrandSelector from './components/brandSelector';
import PriceSelector from './components/priceSelector';
import NameSelector from './components/nameSelector';
import ItemCard from './components/itemCard.js';

import './App.css';
import constants from './constants.js';

import axios from 'axios';

const priceSelectDivName = "priceSelectDiv";
const nameSelectDivName = "nameSelectDiv";

const App = () => {

	// for fetching the brands
	const [fashionBrands, setFashionBrands] = useState([]);
	const [loading, setLoading] = useState(true);

	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

	const getBrands = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/getBrands/');
            setFashionBrands(response.data.brands);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getBrands();
	}, []);

	const getItems = () => {
		if (searchedItems.length === 0) {
			return(
				<div className='col' style={{ textAlign: 'center', alignContent: 'center', overflowY: "scroll" }} id={ constants.divIds.ITEM_PANEL_DIV }>
					<div id={ constants.divIds.SEARCHING_TEXT_DIV }></div>
				</div>
			)
		} else {
			return(
				<div className='col item-card-container' style={{ textAlign: 'center', alignContent: 'center', overflowY: "scroll" }} id={ constants.divIds.ITEM_PANEL_DIV }>
					<div id={ constants.divIds.SEARCHING_TEXT_DIV }></div>
					{ searchedItems
					  .map((item) => (
						<ItemCard item={ item } fashionBrands={ fashionBrands }/>
					  )) }
				</div>
			)
		}
	}

	const search = async () => {
		try {
			setIsSearching(true);
			let searchBrandId = document.getElementById(constants.filterValuesIds.FASHION_BRAND).dataset.brandId;
			let minPrice = document.getElementById(constants.filterValuesIds.FASHION_MIN_PRICE).value;
			let maxPrice = document.getElementById(constants.filterValuesIds.FASHION_MAX_PRICE).value;
			let itemName = document.getElementById(constants.filterValuesIds.FASHION_ITEM_NAME).value;
			let currencyType = document.getElementById(constants.filterValuesIds.FASHION_CURRENCY_TYPE).value;
			const response = await axios.get('/api/search/', {
				params: {
					"brandId": searchBrandId,
					"minPrice": minPrice,
					"maxPrice": maxPrice,
					"itemName": itemName,
					"currencyType": currencyType
				}
			});
			let items = response.data.items;
			setSearchedItems(items);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsSearching(false);
		}
	};

	useEffect(() => {
		getItems();
	}, [searchedItems]);

	useEffect(() => {
		let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
		if (isSearching) {
			searchingTextDiv.innerHTML = "Searching...";
		} else if (!isSearching && (searchedItems.length === 0)) {
			searchingTextDiv.innerHTML = "Searched items will show up here!";
		} else {
			searchingTextDiv.innerHTML = "";
		}
	}, [isSearching])

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
										<div id={ constants.divIds.FASHION_BRAND_DIV_NAME } style={{ visibility: 'visible' }}>
											<BrandSelector fashionBrands={ fashionBrands } loading={ loading } />
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
								<button className='btn btn-success' id={ constants.buttonIds.SEARCH_BTN } onClick={ search }>Search</button>
							</div>
							<button className='btn btn-secondary' id={ constants.buttonIds.RESET_BTN }>Reset</button>
						</div>
					</div>

					{ getItems() }
					
				</div>
				
			</body>
		</html>
	);

}

export default App;
