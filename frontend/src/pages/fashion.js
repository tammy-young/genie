import React, { useState, useEffect } from 'react';
import './../App.css';
import constants from '../constants.js';
import axios from 'axios';

import FilterModal from '../components/filterModal.js';

import { getCurrencyType, getBrandId, getItems } from '../searchUtils.js';
import ImageInfoBox from '../components/imageInfoBox.js';

const startSearchMessage = "Searched items will show up here!"


const FashionSearch = () => {
	// for searching
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

	const search = async () => {
		try {
			setIsSearching(true);

			if (searchedItems.length !== 0) {
				setSearchedItems([]);
			}

			// get input boxes
			let brandInput = document.getElementById(constants.filterValuesIds.FASHION_BRAND);
			let itemNameInput = document.querySelector('[data-id="' + constants.filterValuesIds.FASHION_ITEM_NAME + '"] input');
			let currencyTypeInput = document.getElementsByClassName(constants.filterValuesIds.SELECTED_CURRENCY)[0];
			let priceInput = document.getElementById(constants.filterValuesIds.FASHION_PRICE);

			let searchBrandId = getBrandId(brandInput);
			let priceInputValue = priceInput.innerText || "2\n600";
			let minPrice = priceInputValue.split("\n")[0];
			let maxPrice = priceInputValue.split("\n")[1];
			let currencyType = getCurrencyType(currencyTypeInput);
			let itemName = itemNameInput.value;

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

	useEffect(() => {
		let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
		if (isSearching) {
			searchingTextDiv.className = "w-full flex flex-col justify-center text-center items-center";
			searchingTextDiv.innerHTML = `<img src="${process.env.PUBLIC_URL + "sd-loading.gif"}" alt="Searching..." style="align-self: center;"></img>`;
		}
	}, [isSearching]);

	return (
		<div className='flex flex-col'>
			<h2 className='pt-4 ml-0 font-semibold'>Fashion for Sale in Starbazaar</h2>
			<FilterModal search={search} setSearchedItems={setSearchedItems} setIsSearching={setIsSearching} startSearchMessage={startSearchMessage} />
			{getItems(searchedItems, startSearchMessage)}
		</div>
	)
}

export default FashionSearch;
