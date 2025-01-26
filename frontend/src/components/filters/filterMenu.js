import { onEnterSearch, getBrands, reset } from "../../searchUtils";
import { useState, useEffect } from "react";
import constants from "../../constants.js";

import NameSelector from './nameSelector.js';
import BrandSelector from './brandSelector.js';
import PriceSelector from './priceSelector.js';
import ExcludeBrandSelector from './excludeBrandSelector.js';

import Button from "@mui/material/Button";

const FilterMenu = ({ search, setSearchedItems, setIsSearching, startSearchMessage }) => {
  const [brandsToId, setBrandsToId] = useState([]);
  const itemType = window.location.pathname.split('/')[1] || "fashion";

  const [selectedBrand, setSelectedBrand] = useState({});
  const [excludedBrands, setExcludedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([2, 600]);
  const [currencyType, setCurrencyType] = useState('');
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    if (brandsToId.length === 0) {
      getBrands(setBrandsToId);
    }
    // eslint-disable-next-line
  }, []);

  function clearFilters() {
    setSelectedBrand({});
    setExcludedBrands([]);
    setPriceRange([2, 600]);
    setCurrencyType('');
    setItemName('');
  }

  return (
    <div>
      <form onSubmit={(e) => onEnterSearch(e, search, {selectedBrand, excludedBrands, priceRange, currencyType, itemName})} id="filter-form" className='flex flex-wrap lg:flex-row flex-col'>
        <div className="flex flex-row space-x-4 min-w-fit flex-wrap ml-0 lg:pr-4">
          <BrandSelector brandsToId={brandsToId} setSelectedBrand={setSelectedBrand} selectedBrand={selectedBrand} />
          <ExcludeBrandSelector brandsToId={brandsToId} setExcludedBrands={setExcludedBrands} excludedBrands={excludedBrands} />
          <PriceSelector setPriceRange={setPriceRange} setCurrencyType={setCurrencyType} priceRange={priceRange} currencyType={currencyType} />
          <NameSelector setItemName={setItemName} itemName={itemName} />
        </div>
        <div className='flex space-x-2 lg:mt-[1.6rem]'>
          <Button className={`btn ${itemType} !h-fit !normal-case`} id={constants.buttonIds.SEARCH_BTN} type="submit">Search</Button>
          <Button className='!bg-neutral-500 !h-fit !text-white !normal-case' type="button" onClick={clearFilters}>Clear Filters</Button>
          <Button className='!bg-neutral-400 !h-fit !text-white !normal-case' type="button" onClick={() => reset(setSearchedItems, setIsSearching, startSearchMessage)}>Reset</Button>
        </div>
      </form>
    </div>
  )
}

export default FilterMenu;
