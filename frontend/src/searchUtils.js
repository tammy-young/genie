import constants from './constants.js';
import ItemCard from './components/itemCard.js';

export const getCurrencyType = (currencyCheckbox) => {
	return currencyCheckbox.id === '0' ? "" : currencyCheckbox.id;
}

export const getBrandId = (brandInput) => {
	let brandName = brandInput.value;
	if (brandName === "") {
		return "";
	}
	let brandNameToIdDiv = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
	let brands = JSON.parse(brandNameToIdDiv.innerHTML);
	return brandName in brands ? brands[brandName] : "";
}

export const displayItems = (items) => {
  let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
  searchingTextDiv.innerHTML = "";
  return items.map((item, index) => {
    return (<ItemCard item={item} index={index} />);
  });
}
