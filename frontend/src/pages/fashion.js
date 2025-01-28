import React, { useState, useEffect } from 'react';
import './../App.css';
import constants from '../constants.js';
import axios from 'axios';

import Filters from '../components/filters/filters.js';
import ItemCard from '../components/itemCard.js';

const startSearchMessage = "Searched items will show up here!"


const FashionSearch = () => {
	// for searching
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);

	const search = async (params) => {
		try {
			setIsSearching(true);

			window.scrollTo(0, 0);

			if (searchedItems.length !== 0) {
				setSearchedItems([]);
			}

			const response = await axios.get(constants.backend.API + constants.backend.SEARCH, {
				params: {
					"brandId": params.selectedBrand?.brandId,
					"minPrice": params.priceRange[0],
					"maxPrice": params.priceRange[1],
					"itemName": params.itemName,
					"currencyType": params.currencyType,
					"excludedBrands": params.excludedBrands?.map(brand => brand.brandId),
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
		document.title = 'Fashion | Genie';
		search({ priceRange: [2, 600] });
		// eslint-disable-next-line
	}, []);

	return (
		<div className='flex flex-col h-full'>
			<div className='sticky top-0 dark:!bg-neutral-900 dark:text-neutral-100 z-50'>
				<h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>Fashion for Sale in Starbazaar</h2>
				<div className='pb-4 w-full'>
					<Filters search={search} setSearchedItems={setSearchedItems} setIsSearching={setIsSearching} startSearchMessage={startSearchMessage} />
				</div>
			</div>

			<div id={constants.divIds.SEARCHING_TEXT_DIV} className={`w-full flex justify-center items-center h-full max-h-full ${isSearching ? 'block' : 'hidden'}`}>
				<img src={process.env.PUBLIC_URL + "sd-loading.gif"} alt="Searching..." style={{ alignSelf: "center" }} />
			</div>
			<div className='flex flex-wrap w-full sm:gap-4 justify-center pb-4 sm:space-y-0 space-y-4'>
				{searchedItems.map((item, index) => (
					<ItemCard item={item} index={index} />
				))}
			</div>
		</div>
	)
}

export default FashionSearch;
