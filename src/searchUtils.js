import constants from './constants.js';

export const onEnterSearch = (e, params, itemType, setIsSearching, searchedItems, setSearchedItems, handleClose) => {
	e.preventDefault();
	if (handleClose) {
		handleClose();
	}
	search(params, itemType, setIsSearching, searchedItems, setSearchedItems);
}

function isEmptyObject(obj) {
	return Object.keys(obj).length === 0;
}

export const search = async (params, itemType, setIsSearching, searchedItems, setSearchedItems) => {
	try {
		setIsSearching(true);

		window.scrollTo(0, 0);

		if (searchedItems.length !== 0) {
			setSearchedItems([]);
		}

		const reqParams = new URLSearchParams();
		if (params.selectedBrand && !isEmptyObject(params.selectedBrand)) {
			reqParams.append("brandId", params.selectedBrand.brandId);
		}
		if (params.selectedColour && !isEmptyObject(params.selectedColour)) {
			reqParams.append("colourId", params.selectedColour.categoryId);
		}
		if (params.itemCategory && !isEmptyObject(params.itemCategory)) {
			reqParams.append("itemCategoryId", params.itemCategory.categoryId);
		}
		if (params.priceRange) {
			reqParams.append("minPrice", params.priceRange[0]);
			reqParams.append("maxPrice", params.priceRange[1]);
		}
		if (params.itemName) {
			reqParams.append("itemName", params.itemName);
		}
		if (params.currencyType) {
			reqParams.append("currencyType", params.currencyType);
		}
		if (params.excludedBrands && params.excludedBrands.length > 0) {
			reqParams.append("excludedBrands", params.excludedBrands.map(brand => brand.brandId).join(','));
		}
		reqParams.append("itemType", itemType);

		const response = await fetch(constants.backend.API + constants.backend.SEARCH + "?" + reqParams.toString());
		const data = await response.json();
		let items = data.items;

		setSearchedItems(items);
	} catch (error) {
		console.error('Error fetching data:', error);
	} finally {
		setIsSearching(false);
	}
};