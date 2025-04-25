import constants from './constants.js';
import axios from 'axios';

export const onEnterSearch = (e, params, itemType, setIsSearching, searchedItems, setSearchedItems, handleClose) => {
	e.preventDefault();
	if (handleClose) {
		handleClose();
	}
	search(params, itemType, setIsSearching, searchedItems, setSearchedItems);
}

export const getFilters = async (setBrandsToId, setColoursToId, setItemCategoriesToId, itemType) => {
	try {
		const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);

		let brandsIdToName = response.data.brandsIdToName;

		let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
		brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);

		let formattedBrandsList = [];
		for (const [key, value] of Object.entries(brandsIdToName)) {
			formattedBrandsList.push({ 'name': value, 'brandId': key });
		}
		setBrandsToId(formattedBrandsList);

		let formattedColoursList = [];
		for (const [key, value] of Object.entries(response.data.coloursToId)) {
			formattedColoursList.push({ 'name': key, 'categoryId': value });
		}
		setColoursToId(formattedColoursList);

		if (itemType === "fashion") {
			let formattedFashionItemCategoriesList = [];
			for (const [key, value] of Object.entries(response.data.fashionItemCategoriesToId)) {
				formattedFashionItemCategoriesList.push({ 'name': key, 'categoryId': value });
			}
			setItemCategoriesToId(formattedFashionItemCategoriesList);
		} else if (itemType === "interior") {
			let formattedInteriorItemCategoriesList = [];
			for (const [key, value] of Object.entries(response.data.interiorItemCategoriesToId)) {
				formattedInteriorItemCategoriesList.push({ 'name': key, 'categoryId': value });
			}
			setItemCategoriesToId(formattedInteriorItemCategoriesList);
		}
		
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
				"colourId": params.selectedColour?.categoryId,
				"itemCategoryId": params.itemCategory?.categoryId,
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