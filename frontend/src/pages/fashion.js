import React, { useState, useEffect } from 'react';
import './../App.css';
import constants from '../constants.js';
import axios from 'axios';

import FilterModal from '../components/filters/filterModal.js';

import { getCurrencyType, getBrandId, getItems } from '../searchUtils.js';
import ImageInfoBox from '../components/imageInfoBox.js';
import FilterMenu from '../components/filters/filterMenu.js';

const startSearchMessage = "Searched items will show up here!"


const FashionSearch = () => {
	// for searching
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

	const search = async (params) => {
		try {
			setIsSearching(true);

			if (searchedItems.length !== 0) {
				setSearchedItems([]);
			}

			const response = await axios.get(constants.backend.API + constants.backend.SEARCH, {
				params: {
					"brandId": params.selectedBrand.brandId,
					"minPrice": params.priceRange[0],
					"maxPrice": params.priceRange[1],
					"itemName": params.itemName,
					"currencyType": params.currencyType,
					"excludedBrands": params.excludedBrands.map(brand => brand.brandId),
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
			<h2 className='sm:pt-4 pt-2 ml-0 font-bold'>Fashion for Sale in Starbazaar</h2>
			<div className='lg:block hidden pb-4'>
				<FilterMenu search={search} setSearchedItems={setSearchedItems} setIsSearching={setIsSearching} startSearchMessage={startSearchMessage} />
			</div>
			<div className='lg:hidden block pb-4'>
				<FilterModal search={search} setSearchedItems={setSearchedItems} setIsSearching={setIsSearching} startSearchMessage={startSearchMessage} />
			</div>
			{getItems(searchedItems, startSearchMessage)}
		</div>
	)
}

export default FashionSearch;
