import { onEnterSearch } from "../../../searchUtils.js";

import NameSelector from '../itemNameFilter.js';
import BrandSelector from '../brandFilter.js';
import PriceSelector from '../priceFilter.js';
import ExcludeBrandSelector from '../excludeBrandFilter.js';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ColourFilter from "../colourFilter.js";
import ItemCategoryFilter from "../itemCategoryFilter.js";

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24
};

const FilterModal = ({
  open,
  handleOpen,
  handleClose,
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
  clearFilters,
  itemTypeFilter,
  brandFilter,
  colourFilter,
  errors,
  setErrors,
  isSearching
}) => {

  function validateAndSearch(e) {
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      return;
    }
    onEnterSearch(
      e,
      { selectedBrand, excludedBrands, selectedColour, itemCategory, priceRange, currencyType, itemName },
      itemType,
      setIsSearching,
      searchedItems,
      setSearchedItems,
      handleClose
    );
  }

  return (
    <div className="!block w-full">
      <div className="flex space-x-2">
        <button
          className='px-3 py-2 rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform border !text-black dark:!text-white'
          onClick={handleOpen}
        >
          <span className='mb-0 font-semibold'>Filters</span>
        </button>
        <button
          className={`px-3 py-2 rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform ${itemType} !text-white ${isSearching ? 'opacity-50' : ''}`}
          onClick={validateAndSearch}
          disabled={isSearching}
        >
          <span className='mb-0 font-semibold'>Search</span>
        </button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="dark:!bg-neutral-800 dark:!text-white p-4 w-[95%] sm:w-3/5 lg:w-2/5 !rounded-lg">
          <form
            onSubmit={validateAndSearch}
            id="filter-form"
            className="flex flex-col space-y-4 w-full flex-wrap ml-0"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold mb-0">Filters</h1>
              <CloseIcon onClick={handleClose} className="cursor-pointer !text-neutral-400" />
            </div>
            <hr className="dark:border-neutral-500" />
            <div className="space-y-4 overflow-y-auto">
              {
                brandFilter ? (
                  <BrandSelector
                    brandsToId={brandsToId}
                    setSelectedBrand={setSelectedBrand}
                    selectedBrand={selectedBrand}
                  />
                ) : null
              }
              {
                brandFilter ? (
                  <ExcludeBrandSelector
                    brandsToId={brandsToId}
                    setExcludedBrands={setExcludedBrands}
                    excludedBrands={excludedBrands}
                  />
                ) : null
              }
              {
                colourFilter ? (
                  <ColourFilter
                    coloursToId={coloursToId}
                    setSelectedColour={setSelectedColour}
                    selectedColour={selectedColour}
                  />
                ) : null
              }
              {
                itemTypeFilter ? (
                  <ItemCategoryFilter
                    itemCategoriesToId={itemCategoriesToId}
                    setItemCategory={setItemCategory}
                    itemCategory={itemCategory}
                  />
                ) : null
              }
              <PriceSelector
                setPriceRange={setPriceRange}
                setCurrencyType={setCurrencyType}
                priceRange={priceRange}
                currencyType={currencyType}
                errors={errors}
                setErrors={setErrors}
              />
              <NameSelector setItemName={setItemName} itemName={itemName} />
            </div>
            <div className="flex space-x-2 ml-0">
              <button
                className={`px-3 py-2 rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !text-black dark:!text-white ${itemType} ${isSearching ? 'opacity-50' : ''}`}
                type="submit"
                disabled={isSearching}
              >
                <span className='mb-0 font-semibold'>Search</span>
              </button>
              <button
                className={`px-3 py-2 rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !bg-neutral-500 !text-white`}
                onClick={clearFilters}
                type="button"
              >
                <span className='mb-0 font-semibold'>Clear Filters</span>
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default FilterModal;
