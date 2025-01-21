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

export const getItems = (searchedItems, startSearchMessage) => {
	return (
		<div className='!h-[84vh] w-full flex justify-center items-center'>
			{
				searchedItems.length === 0 ? (
					<div id={constants.divIds.SEARCHING_TEXT_DIV}>{startSearchMessage}</div>
				) : (
					<div>
						<div id={constants.divIds.SEARCHING_TEXT_DIV}></div>
						{displayItems(searchedItems)}
					</div>
				)
			}
		</div>
	)
}

export const displayItems = (items) => {
	let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
	searchingTextDiv.innerHTML = "";
	return (
		<div className='flex flex-wrap w-full sm:gap-4 space-y-4 sm:space-y-0 justify-center py-4 overflow-y-scroll max-h-[84vh]'>
			{items.map((item, index) => (
				<ItemCard item={item} index={index} />
			))}
		</div>
	);
}

export const clickSearch = (e) => {
	e.preventDefault();
	let button = document.getElementById(constants.buttonIds.SEARCH_BTN);
	button.click();
}

export const reset = (setSearchedItems, setIsSearching, startSearchMessage) => {
	setSearchedItems([]);
	setIsSearching(false);
	let searchingTextDiv = document.getElementById(constants.divIds.SEARCHING_TEXT_DIV);
	searchingTextDiv.innerHTML = startSearchMessage;
}
