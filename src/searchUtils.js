import constants from './constants.js';

export const onEnterSearch = (e, params, itemType, setIsSearching, searchedItems, setSearchedItems, handleClose) => {
	e.preventDefault();
	if (handleClose) {
		handleClose();
	}
	search(params, itemType, setIsSearching, searchedItems, setSearchedItems);
}

export const getFilters = async (setBrandsToId, setColoursToId, setItemCategoriesToId, itemType) => {
	try {
		const response = await fetch(constants.backend.API + constants.backend.GET_BRANDS + '?onlySellable=true');
		const data = await response.json();

		let brandsIdToName = data.brandsIdToName;

		let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
		brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);

		let formattedBrandsList = [];
		for (const [key, value] of Object.entries(brandsIdToName)) {
			formattedBrandsList.push({ 'name': value, 'brandId': key });
		}
		setBrandsToId(formattedBrandsList);

		let formattedColoursList = [];
		for (const [key, value] of Object.entries(data.coloursToId)) {
			formattedColoursList.push({ 'name': key, 'categoryId': value });
		}
		setColoursToId(formattedColoursList);

		if (itemType === "fashion") {
			let formattedFashionItemCategoriesList = [];
			for (const [key, value] of Object.entries(data.fashionItemCategoriesToId)) {
				formattedFashionItemCategoriesList.push({ 'name': key, 'categoryId': value });
			}
			setItemCategoriesToId(formattedFashionItemCategoriesList);
		} else if (itemType === "interior") {
			let formattedInteriorItemCategoriesList = [];
			for (const [key, value] of Object.entries(data.interiorItemCategoriesToId)) {
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

		const params = new URLSearchParams();
		if (params.selectedBrand) {
			params.append("brandId", params.selectedBrand.brandId);
		}
		if (params.selectedColour) {
			params.append("colourId", params.selectedColour.categoryId);
		}
		if (params.itemCategory) {
			params.append("itemCategoryId", params.itemCategory.categoryId);
		}
		if (params.priceRange) {
			params.append("minPrice", params.priceRange[0]);
			params.append("maxPrice", params.priceRange[1]);
		}
		if (params.itemName) {
			params.append("itemName", params.itemName);
		}
		if (params.currencyType) {
			params.append("currencyType", params.currencyType);
		}
		if (params.excludedBrands && params.excludedBrands.length > 0) {
			params.append("excludedBrands", params.excludedBrands.map(brand => brand.brandId).join(','));
		}
		params.append("itemType", itemType);

		const response = await fetch(constants.backend.API + constants.backend.SEARCH + "?" + params.toString());
		const data = await response.json();
		let items = data.items;

		setSearchedItems(items);
	} catch (error) {
		console.error('Error fetching data:', error);
	} finally {
		setIsSearching(false);
	}
};