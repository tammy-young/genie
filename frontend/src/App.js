import React, { useState, useEffect } from 'react';
import './App.css';
import constants from './constants.js';
import axios from 'axios';

import ItemCard from './components/itemCard.js';
import FilterTable from './components/filterColumn.js';


const getCurrencyType = (currencyCheckbox) => {
	return currencyCheckbox.checked? 2: 1;
}

const App = () => {
	
	// for searching
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

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
						<ItemCard item={ item } />
					  )) }
				</div>
			)
		}
	}

	const search = async () => {
		try {
			setIsSearching(true);

			// get the filter sections (don't exist when closed)
			let brandFilterSection = document.getElementById(constants.divIds.FASHION_BRAND_DIV);
			let priceFilterSection = document.getElementById(constants.divIds.FASHION_PRICE_DIV);
			let nameFilterSection = document.getElementById(constants.divIds.FASHION_NAME_DIV);

			// get input boxes
			let brandInput = document.getElementById(constants.filterValuesIds.FASHION_BRAND);
			let itemNameInput = document.getElementById(constants.filterValuesIds.FASHION_ITEM_NAME);
			let currencyTypeInput = document.getElementById(constants.filterValuesIds.FASHION_CURRENCY_TYPE);
			let priceInput = document.getElementById(constants.filterValuesIds.FASHION_PRICE);

			let searchBrandId = brandFilterSection !== null? brandInput.brandId : "";
			let priceInputValue = priceFilterSection !== null? priceInput.innerText: "2\n600";
			let minPrice = priceInputValue.split("\n")[0];
			let maxPrice = priceInputValue.split("\n")[1];
			let currencyType = priceFilterSection !== null? getCurrencyType(currencyTypeInput) : "";
			let itemName = nameFilterSection !== null? itemNameInput.value : "";

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
						<h2>Genie</h2>
					</div>
				</div>
				<div className='row' style={{ paddingLeft: '30px', height: '100%' }}>
					<div className='col filter-col'>
						<h2 style={{ paddingBottom: '30px' }}>Fashion</h2>
						
						<FilterTable />

						<div className='row'>
							<div style={{ paddingRight: '5px' }}>
								<button className='btn btn-success' id={ constants.buttonIds.SEARCH_BTN } onClick={ search }>Search</button>
							</div>
							<button className='btn btn-secondary' id={ constants.buttonIds.RESET_BTN }>Reset</button>
						</div>
					</div>

					{ getItems() }
					
				</div>

				<div style={{ display: "none" }} id={ constants.divIds.ALL_BRANDS_DIV }></div>
				
			</body>
		</html>
	);

}

export default App;
