import constants from '../constants.js';

// Common initialization function for pages that fetch brands and colors
export const initializeFashionData = (setBrands, setColours, setCategories) => {
	fetch(`${constants.backend.API}${constants.backend.GET_BRANDS}?onlySellable=true`)
		.then((response) => response.json())
		.then((data) => {
			setBrands(data.brands);
			setColours(data.colours);
			setCategories(data.fashionItemCategories);
		})
	// .catch((error) => console.error('Error fetching fashion data:', error));
};

export const initializeInteriorData = (setBrands, setColours, setCategories) => {
	fetch(`${constants.backend.API}${constants.backend.GET_BRANDS}?onlySellable=true`)
		.then((response) => response.json())
		.then((data) => {
			setBrands(data.brands);
			setColours(data.colours);
			setCategories(data.interiorItemCategories);
		})
	// .catch((error) => console.error('Error fetching interior data:', error));
};

export const initializeJewelryData = (setBrands, setColours) => {
	fetch(`${constants.backend.API}${constants.backend.GET_BRANDS}?onlySellable=true`)
		.then((response) => response.json())
		.then((data) => {
			setBrands(data.brands);
			setColours(data.colours);
		})
	// .catch((error) => console.error('Error fetching jewelry data:', error));
};

// Hair doesn't need any initialization since it uses a constant for brands
export const initializeHairData = null;
