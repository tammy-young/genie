import React, { useState, useEffect } from 'react';
import './../App.css';
import constants from '../constants.js';
import axios from 'axios';

import FilterTable from '../components/filterColumn.js';

import { getCurrencyType, getBrandId, displayItems } from '../searchUtils.js';
import { clickSearch } from '../searchUtils.js';

const startSearchMessage = "Searched items will show up here!"


const FashionSearch = () => {
	// for searching
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

	const getItems = () => {
		if (searchedItems.length === 0) {
			return (
				<div className='col' style={{ textAlign: 'center', alignContent: 'center', overflowY: "scroll", maxWidth: '100%' }} id={constants.divIds.ITEM_PANEL_DIV}>
					<div id={constants.divIds.SEARCHING_TEXT_DIV}>{startSearchMessage}</div>
				</div>
			)
		} else {
			return (
				<div className='col item-card-container' style={{ textAlign: 'center', overflowY: "scroll", maxWidth: '100%' }} id={constants.divIds.ITEM_PANEL_DIV}>
					<div id={constants.divIds.SEARCHING_TEXT_DIV}>{startSearchMessage}</div>
					{displayItems(searchedItems)}
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

			let searchBrandId = brandFilterSection !== null ? getBrandId(brandInput) : "";
			let priceInputValue = priceFilterSection !== null ? priceInput.innerText : "2\n600";
			let minPrice = priceInputValue.split("\n")[0];
			let maxPrice = priceInputValue.split("\n")[1];
			let currencyType = priceFilterSection !== null ? getCurrencyType(currencyTypeInput) : "";
			let itemName = nameFilterSection !== null ? itemNameInput.value : "";

			// excluded brands
			let excludedBrands = document.getElementById(constants.divIds.EXCLUDED_BRANDS_DIV).innerText;
			excludedBrands = excludedBrands !== "" ? excludedBrands.split(",") : [];

			const response = await axios.get(constants.backend.API + constants.backend.SEARCH, {
				params: {
					"brandId": searchBrandId,
					"minPrice": minPrice,
					"maxPrice": maxPrice,
					"itemName": itemName,
					"currencyType": currencyType,
					"excludedBrands": excludedBrands,
					"itemType": "fashion"
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
			searchingTextDiv.className = "w-full flex flex-row justify-center text-center items-center";
			searchingTextDiv.innerHTML = `<img src="${process.env.PUBLIC_URL + "sd-loading.gif"}" alt="Searching..." style="align-self: center;"></img>`;
		}
	}, [isSearching]);

	useEffect(() => {
		const forms = document.querySelectorAll('filter-form');

		forms.forEach((form) => {
			form.addEventListener('keypress', function (event) {
				if (event.keyCode === 13) {
					event.preventDefault();
					form.submit();
				}
			});
		})
	}, []);

	return (
		<div className='page'>
			<form onSubmit={(e) => e.preventDefault() && clickSearch()} className='filter-form h-full'>
				<div className='row' style={{ height: '100%' }}>
					<div className='col filter-col' style={{ minWidth: '350px', maxWidth: '350px' }}>
						<h2 style={{ paddingTop: '20px' }}>Fashion</h2>
						<div className='row space-y-4' style={{ padding: '15px' }}>
							<FilterTable />
							<div style={{ paddingRight: '5px' }}>
								<button className='btn fashion' id={constants.buttonIds.SEARCH_BTN} onClick={search}>Search</button>
							</div>
							<button className='btn btn-secondary' id={constants.buttonIds.RESET_BTN} onClick={reset}>Reset</button>
						</div>
					</div>
					<div className="col flex" style={{ textAlign: 'center' }}>
						{getItems()}
					</div>
					<div style={{ display: "none" }} id={constants.divIds.BRANDS_NAME_TO_ID}></div>
					<div style={{ display: "none" }} id={constants.divIds.BRANDS_ID_TO_NAME}></div>
					<div style={{ display: "none" }} id={constants.divIds.EXCLUDED_BRANDS_DIV}></div>
				</div>
			</form>
		</div>
	)
}

export default FashionSearch;
