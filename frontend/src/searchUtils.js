import constants from './constants.js';
import axios from 'axios';

export const onEnterSearch = (e, params, itemType, setIsSearching, searchedItems, setSearchedItems, handleClose) => {
	e.preventDefault();
	if (handleClose) {
		handleClose();
	}
	search(params, itemType, setIsSearching, searchedItems, setSearchedItems);
}

export const getBrands = async (setBrandsToId) => {
	try {
		const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);

		let brandsIdToName = response.data.brandsIdToName;
		let brandsNameToId = response.data.brandsNameToId;

		let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
		let brandsNameToIdHidden = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
		brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);
		brandsNameToIdHidden.innerHTML = JSON.stringify(brandsNameToId);

		let formattedBrandsList = [];
		for (const [key, value] of Object.entries(brandsNameToId)) {
			formattedBrandsList.push({ 'name': key, 'brandId': value });
		}
		setBrandsToId(formattedBrandsList);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

export const search = async (params, itemType, setIsSearching, searchedItems, setSearchedItems) => {
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
				"itemType": itemType
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