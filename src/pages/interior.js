import { useState, useEffect } from 'react';
import '../App.css';
import { search } from '../searchUtils.js';
import axios from 'axios';
import constants from '../constants.js';

import Filters from '../components/filters/filters.js';
import ItemCard from '../components/itemCard.js';


const InteriorSearch = () => {
	// for searching
	const [isSearching, setIsSearching] = useState(false);
	const [searchedItems, setSearchedItems] = useState([]);
	const [allBrands, setAllBrands] = useState({});

	useEffect(() => {
		document.title = 'Interior | Genie';
		search({ priceRange: [2, 600] }, "interior", setIsSearching, searchedItems, setSearchedItems);
		axios.get(constants.backend.API + constants.backend.GET_BRANDS)
			.then((response) => {
				let brandsIdToName = response.data.brandsIdToName;
				setAllBrands(brandsIdToName);
			})
		// eslint-disable-next-line
	}, []);

	return (
		<div className='flex flex-col h-full'>
			<div className='sticky top-0 dark:!bg-neutral-900 dark:text-neutral-100 !bg-white z-50'>
				<h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>Interior for Sale in Starbazaar</h2>
				<div className='pb-4 w-full'>
					<Filters setIsSearching={setIsSearching} searchedItems={searchedItems} setSearchedItems={setSearchedItems} modal={true} allBrands={allBrands} />
				</div>
			</div>

			<div className='flex flex-wrap w-full sm:gap-4 justify-center pb-4 sm:space-y-0 space-y-4'>
				{
					(
						isSearching && (
							<div className={`w-full flex justify-center items-center h-full max-h-full ${isSearching ? 'block' : 'hidden'}`}>
								<img src={process.env.PUBLIC_URL + "sd-loading.gif"} alt="Searching..." style={{ alignSelf: "center" }} />
							</div>
						)
					) || (
						(searchedItems.length !== 0 && !isSearching) &&
						searchedItems.map((item, index) => (
							<ItemCard item={item} index={index} itemType={"interior"} allBrands={allBrands} />
						))
					) || (
						(
							(searchedItems.length === 0 && !isSearching) &&
							<div className='flex justify-center items-center w-full h-full flex-col space-y-1'>
								<p className='m-0 p-0'>No items found.</p>
								<p className='m-0 p-0'>Clear filters and try again!</p>
							</div>
						)
					)
				}
			</div>
		</div>
	)
}

export default InteriorSearch;
