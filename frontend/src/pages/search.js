import React, { useState, useEffect } from 'react';
import './../App.css';
import constants from './../constants.js';
import axios from 'axios';

import ItemCard from './../components/itemCard.js';
import FilterTable from './../components/filterColumn.js';

const startSearchMessage = "Searched items will show up here!"


const getCurrencyType = (currencyCheckbox) => {
	return currencyCheckbox.id === '0'? "" : currencyCheckbox.id;
}

const getBrandId = (brandInput) => {
	let brandName = brandInput.value;
	if (brandName === "") {
		return "";
	}
	let brandNameToIdDiv = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
	let brands = JSON.parse(brandNameToIdDiv.innerHTML);
	return brandName in brands? brands[brandName] : "";
}

const displayItems = (items) => {
	let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
	searchingTextDiv.innerHTML = "";
	return items.map((item, index) => {
		return (<ItemCard item={ item } index={ index } />);
	});
}

const Search = () => {
    // for searching
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

	const getItems = () => {
		if (searchedItems.length === 0) {
			return(
				<div className='col' style={{ textAlign: 'center', alignContent: 'center', overflowY: "scroll", maxWidth: '100%' }} id={ constants.divIds.ITEM_PANEL_DIV }>
					<div id={ constants.divIds.SEARCHING_TEXT_DIV }>{ startSearchMessage }</div>
				</div>
			)
		} else {
			return(
				<div className='col item-card-container' style={{ textAlign: 'center', overflowY: "scroll", maxWidth: '100%' }} id={ constants.divIds.ITEM_PANEL_DIV }>
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
			let currencyTypeInput = document.getElementsByClassName(constants.filterValuesIds.SELECTED_CURRENCY)[0];
			let priceInput = document.getElementById(constants.filterValuesIds.FASHION_PRICE);
			let stardesignInput = document.getElementById(constants.filterValuesIds.SHOW_STARDESIGN);

			let searchBrandId = brandFilterSection !== null? getBrandId(brandInput) : "";
			let priceInputValue = priceFilterSection !== null? priceInput.innerText: "2\n600";
			let minPrice = priceInputValue.split("\n")[0];
			let maxPrice = priceInputValue.split("\n")[1];
			let currencyType = priceFilterSection !== null? getCurrencyType(currencyTypeInput) : "";
			let itemName = nameFilterSection !== null? itemNameInput.value : "";
			let showStardesign = stardesignInput !== null? stardesignInput.checked : true;

			const response = await axios.get(constants.backend.API + constants.backend.SEARCH, {
				params: {
					"brandId": searchBrandId,
					"minPrice": minPrice,
					"maxPrice": maxPrice,
					"itemName": itemName,
					"currencyType": currencyType,
					"showStardesign": showStardesign
				}
			});

			let items = response.data.items;
			if (items.length === 0) {
				document.getElementById(constants.divIds.SEARCHING_TEXT_DIV).innerHTML = "No Items Found!";
			} else {
				setSearchedItems(items);
			}
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
		// eslint-disable-next-line
	}, [searchedItems]);

	useEffect(() => {
		let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
		if (isSearching) {
			searchingTextDiv.innerHTML = "Searching...";
		}
	}, [isSearching])

    return(
        <div className='page'>
            <div className='row' style={{ paddingLeft: '30px', height: '100%', minWidth: '250px' }}>
                <div className='col filter-col' style={{ minWidth: '250px', maxWidth: '350px' }}>
                    <h2 style={{ paddingTop: '30px' }}>Fashion</h2>
                    
                    <FilterTable />

                    <div className='row' style={{ padding: '15px' }}>
                        <div style={{ paddingRight: '5px' }}>
                            <button className='btn genie-primary' id={ constants.buttonIds.SEARCH_BTN } onClick={ search }>Search</button>
                        </div>
                        <button className='btn btn-secondary' id={ constants.buttonIds.RESET_BTN } onClick={ reset }>Reset</button>
                    </div>
                </div>
				<div className='col' style={{ textAlign: 'center', display: 'flex' }}>
					{ getItems() }
				</div>
            </div>
			<div style={{ display: "none" }} id={ constants.divIds.BRANDS_NAME_TO_ID }></div>
			<div style={{ display: "none" }} id={ constants.divIds.BRANDS_ID_TO_NAME }></div>
        </div>
    )
}

export default Search;
