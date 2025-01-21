import { onEnterSearch, getBrands, reset } from "../../searchUtils";
import { useState, useEffect } from "react";
import constants from "../../constants.js";

import NameSelector from './nameSelector.js';
import BrandSelector from './brandSelector.js';
import PriceSelector from './priceSelector.js';
import ExcludeBrandSelector from './excludeBrandSelector.js';

const FilterMenu = ({ search, setSearchedItems, setIsSearching, startSearchMessage }) => {
  const [brandsToId, setBrandsToId] = useState([]);
  const itemType = window.location.pathname.split('/')[1] || "fashion";

  useEffect(() => {
      if (brandsToId.length === 0) {
        getBrands(setBrandsToId);
      }
      // eslint-disable-next-line
    }, []);

  return (
    <div>
      <form onSubmit={(e) => onEnterSearch(e, search)} id="filter-form" className='flex flex-row space-x-4 w-full flex-wrap ml-0'>
        <BrandSelector brandsToId={brandsToId} />
        <ExcludeBrandSelector brandsToId={brandsToId} />
        <PriceSelector />
        <NameSelector />
        <div className='flex space-x-2 mt-4'>
          <button className={`btn ${itemType} !h-fit`} id={constants.buttonIds.SEARCH_BTN} type="submit">Search</button>
          <button className='btn btn-secondary h-fit' type="button" onClick={(e) => reset(setSearchedItems, setIsSearching, startSearchMessage)}>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default FilterMenu;
