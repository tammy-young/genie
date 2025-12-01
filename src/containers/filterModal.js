import { onEnterSearch } from "../searchUtils.js";

import NameSelector from '../components/filters/itemNameFilter.js';
import BrandSelector from '../components/filters/brandFilter.js';
import PriceSelector from '../components/filters/priceFilter.js';
import ExcludeBrandSelector from '../components/filters/excludeBrandFilter.js';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ColourFilter from "../components/filters/colourFilter.js";
import ItemCategoryFilter from "../components/filters/itemCategoryFilter.js";
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import { FormControl, FormLabel } from "@mui/joy";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

// function SortingSelector({ sortBy, setSortBy }) {
//   const options = [
//     { value: 'relevance', label: 'Relevance' },
//     { value: 'increasing', label: 'Sell Price Increasing' },
//     { value: 'decreasing', label: 'Sell Price Decreasing' }
//   ];
//   return (
//     <Select
//       defaultValue="relevance"
//       value={sortBy}
//       onChange={(e, newValue) => setSortBy(newValue)}
//       variant="outlined"
//       className="min-w-[150px] dark:!bg-neutral-800 dark:!text-white"
//       slotProps={{
//         listbox: {
//           sx: (theme) => ({
//             zIndex: theme.vars.zIndex.modal,
//           }),
//           className: 'dark:!bg-neutral-800'
//         }
//       }}
//     >
//       {
//         options.map((option) => (
//           <Option
//             key={option.value}
//             value={option.value}
//             className="dark:!bg-neutral-800 dark:!text-white dark:hover:!bg-neutral-700 dark:aria-selected:!bg-neutral-700 aria-selected:font-bold"
//           >
//             {option.label}
//           </Option>
//         ))
//       }
//     </Select>
//   )
// }

function SavedFilterItem({ filter, setSavedFilter }) {
  return (
    <button
      className="p-2 px-3 border border-neutral-300 dark:border-neutral-600 rounded-full"
      type="button"
      onClick={() => setSavedFilter(filter)}
    >
      <p className="font-semibold m-0 p-0">{filter.name}</p>
    </button>
  )
}

function SavedFilters({ setSavedFilter }) {
  const savedFilters = useSelector(state => state.filters);
  const navigate = useNavigate();

  return (
    <FormControl>
      <FormLabel className="dark:!text-white">
        Saved Filters
      </FormLabel>
      <div className="flex flex-wrap gap-2">
        {
          savedFilters && savedFilters.length > 0 ? (
            savedFilters.map((filter, index) => (
              <SavedFilterItem key={index} filter={filter} setSavedFilter={setSavedFilter} />
            ))
          ) : (
            <div className="flex flex-row items-center">
              <p className="m-0 p-0 text-neutral-400">
                No saved filters.
              </p>
              <p className="m-0 p-0 !text-primary cursor-pointer pl-1 font-medium" onClick={() => navigate('/profile')}>
                Create one!
              </p>
            </div>
          )
        }
      </div>
      {
        savedFilters.length > 0 ? (
          <FormLabel className="font-medium !text-primary pt-1 cursor-pointer" onClick={() => navigate('/profile')}>
            Manage filters...
          </FormLabel>
        ) : null
      }
    </FormControl>
  )
}

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
  isSearching,
  sortBy,
  setSortBy,
  sortedItems,
  setSortedItems,
  setSavedFilter
}) => {
  const userId = useSelector((state) => state.id);

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
      sortBy,
      setSortedItems,
      handleClose
    );
  }

  return (
    <div className="!block w-full">
      <div className="flex flex-row justify-between">
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
        {/* <div>
          <SortingSelector sortBy={sortBy} setSortBy={setSortBy} setSearchedItems={setSearchedItems} />
        </div> */}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="dark:!bg-neutral-800 dark:!text-white p-4 w-[95%] sm:w-3/5 lg:w-2/5 !rounded-lg">
          <form
            onSubmit={validateAndSearch}
            id="filter-form"
            className="flex flex-col space-y-4 w-full flex-wrap ml-0"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold mb-0 sm:text-3xl text-2xl">Filters</h1>
              <CloseIcon onClick={handleClose} className="cursor-pointer !text-neutral-400" />
            </div>
            <hr className="dark:border-neutral-500" />
            <div className="space-y-2 overflow-y-auto">
              {userId ? <SavedFilters setSavedFilter={setSavedFilter} /> : null}
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
