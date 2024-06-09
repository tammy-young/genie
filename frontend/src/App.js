import React, { useState, useEffect } from 'react';
import './App.css';
import constants from './constants.js';
import axios from 'axios';

import ItemCard from './components/itemCard.js';
import FilterTable from './components/filterColumn.js';
import GenieIcon from './components/images/genieLogo.js';

const startSearchMessage = "Searched items will show up here!"


const getCurrencyType = (currencyCheckbox) => {
	return currencyCheckbox.checked? 2: 1;
}

const getBrandId = (brandInput) => {
	let brandName = brandInput.value;
	let brandNameToIdDiv = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
	let brands = JSON.parse(brandNameToIdDiv.innerHTML);
	try {
		return brands[brandName];
	} catch {
		return "";
	}
}

const displayItems = (items) => {
	if (items.length === 0) {
		return "No Items Found!";
	} else {
		let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
		searchingTextDiv.innerHTML = "";
		return items.map((item) => (
			<ItemCard item={ item } />
		));
	}
}

const App = () => {
	
	// for searching
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

	const getItems = () => {
		if (searchedItems.length === 0) {
			return(
				<div className='col' style={{ textAlign: 'center', alignContent: 'center', overflowY: "scroll" }} id={ constants.divIds.ITEM_PANEL_DIV }>
					<div id={ constants.divIds.SEARCHING_TEXT_DIV }>{ startSearchMessage }</div>
				</div>
			)
		} else {
			return(
				<div className='col item-card-container' style={{ textAlign: 'center', alignContent: 'center', overflowY: "scroll" }} id={ constants.divIds.ITEM_PANEL_DIV }>
					<div id={ constants.divIds.SEARCHING_TEXT_DIV }>{ startSearchMessage }</div>
					{ displayItems(searchedItems) }
				</div>
			)
		}
	}

	const search = async () => {
		try {
			setIsSearching(true);

			if (searchedItems.length !== 0) {
				setSearchedItems([]);
			}

			// get the filter sections (don't exist when closed)
			let brandFilterSection = document.getElementById(constants.divIds.FASHION_BRAND_DIV);
			let priceFilterSection = document.getElementById(constants.divIds.FASHION_PRICE_DIV);
			let nameFilterSection = document.getElementById(constants.divIds.FASHION_NAME_DIV);

			// get input boxes
			let brandInput = document.getElementById(constants.filterValuesIds.FASHION_BRAND);
			let itemNameInput = document.querySelector('[data-id="' + constants.filterValuesIds.FASHION_ITEM_NAME + '"] input');
			let currencyTypeInput = document.getElementById(constants.filterValuesIds.FASHION_CURRENCY_TYPE);
			let priceInput = document.getElementById(constants.filterValuesIds.FASHION_PRICE);

			let searchBrandId = brandFilterSection !== null? getBrandId(brandInput) : "";
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

	const reset = () => {
		setSearchedItems([]);
		setIsSearching(false);
		let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
		searchingTextDiv.innerHTML = startSearchMessage;
	}

	useEffect(() => {
		getItems();
	}, [searchedItems]);

	useEffect(() => {
		let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
		if (isSearching) {
			searchingTextDiv.innerHTML = "Searching...";
		}
	}, [isSearching])

	return (
		<html>
			<body style={{ padding: '30px', top: 0, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
				<div className='row' style={{ marginTop:'-30px' }}>
					<GenieIcon />
				</div>
				
				<div className='row' style={{ paddingLeft: '30px', height: '100%' }}>
					<div className='col filter-col'>
						<h2 style={{ paddingBottom: '30px' }}>Fashion</h2>
						
						<FilterTable />

						<div className='row' style={{ padding: '15px' }}>
							<div style={{ paddingRight: '5px' }}>
								<button className='btn btn-success' id={ constants.buttonIds.SEARCH_BTN } onClick={ search }>Search</button>
							</div>
							<button className='btn btn-secondary' id={ constants.buttonIds.RESET_BTN } onClick={ reset }>Reset</button>
						</div>
					</div>

					{ getItems() }
					
				</div>

				<div style={{ display: "none" }} id={ constants.divIds.BRANDS_NAME_TO_ID }></div>
				<div style={{ display: "none" }} id={ constants.divIds.BRANDS_ID_TO_NAME }></div>
				
			</body>
		</html>
	);

}

export default App;
