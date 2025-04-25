import { onEnterSearch } from "../../../searchUtils.js";

import NameSelector from '../itemNameFilter.js';
import BrandSelector from '../brandFilter.js';
import PriceSelector from '../priceFilter.js';
import ExcludeBrandSelector from '../excludeBrandFilter.js';

import Button from "@mui/material/Button";
import ColourFilter from "../colourFilter.js";
import ItemCategoryFilter from "../itemCategoryFilter.js";

const FilterBar = ({
  selectedBrand,
  setSelectedBrand,
  excludedBrands,
  setExcludedBrands,
  selectedColour,
  setSelectedColour,
  itemCategory,
  setItemCategory,
  priceRange,
  setPriceRange,
  currencyType,
  setCurrencyType,
  itemName,
  setItemName,
  itemType,
  setIsSearching,
  searchedItems,
  setSearchedItems,
  brandsToId,
  coloursToId,
  itemCategoriesToId,
  clearFilters
}) => {
  return (
    <form
      className="flex w-full flex-wrap !flex-row space-x-4"
      onSubmit={(e) =>
        onEnterSearch(
          e,
          { selectedBrand, excludedBrands, selectedColour, itemCategory, priceRange, currencyType, itemName },
          itemType,
          setIsSearching,
          searchedItems,
          setSearchedItems
        )
      }
    >
      <div className='2xl:!max-w-[17%] 2xl:!w-1/6'>
        <BrandSelector
          brandsToId={brandsToId}
          setSelectedBrand={setSelectedBrand}
          selectedBrand={selectedBrand}
        />
      </div>

      <div className='2xl:!max-w-[17%] 2xl:!w-1/6'>
        <ExcludeBrandSelector
          brandsToId={brandsToId}
          setExcludedBrands={setExcludedBrands}
          excludedBrands={excludedBrands}
        />
      </div>

      <div className='2xl:!max-w-[17%] 2xl:!w-1/6'>
        <ColourFilter
          coloursToId={coloursToId}
          setSelectedColour={setSelectedColour}
          selectedColour={selectedColour}
        />
      </div>

      <div className='2xl:!max-w-[17%] 2xl:!w-1/6'>
        <ItemCategoryFilter
          itemCategoriesToId={itemCategoriesToId}
          setItemCategory={setItemCategory}
          itemCategory={itemCategory}
        />
      </div>

      <PriceSelector
        setPriceRange={setPriceRange}
        setCurrencyType={setCurrencyType}
        priceRange={priceRange}
        currencyType={currencyType}
      />

      <div className="2xl:!max-w-[17%] 2xl:!w-1/6 pr-8">
        <NameSelector
          setItemName={setItemName}
          itemName={itemName}
        />
      </div>

      <div className="flex space-x-2 lg:mt-[1.6rem] w-fit ml-0">
        <Button
          className={`btn ${itemType} !h-fit !normal-case`}
          type="submit"
        >
          Search
        </Button>
        <Button
          className="!bg-neutral-500 !h-fit !text-white !normal-case"
          type="button"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </form>
  )
}

export default FilterBar;
