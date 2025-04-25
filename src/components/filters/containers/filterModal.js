import { onEnterSearch } from "../../../searchUtils.js";

import NameSelector from '../itemNameFilter.js';
import BrandSelector from '../brandFilter.js';
import PriceSelector from '../priceFilter.js';
import ExcludeBrandSelector from '../excludeBrandFilter.js';

import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ColourFilter from "../colourFilter.js";
import ItemCategoryFilter from "../itemCategoryFilter.js";

const style = {
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
  clearFilters
}) => {
  return (
    <div className="!block w-full">
      <div className="flex space-x-2">
        <Button onClick={handleOpen} className="border !text-black dark:!text-white !normal-case">
          Filters
        </Button>
        <Button
          onClick={(e) =>
            onEnterSearch(
              e,
              { selectedBrand, excludedBrands, selectedColour, itemCategory, priceRange, currencyType, itemName },
              itemType,
              setIsSearching,
              searchedItems,
              setSearchedItems,
            )
          }
          className={`${itemType} !text-white !normal-case`}
        >
          Search
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="dark:!bg-[#1f2023] dark:!text-white p-4 w-[95%] sm:w-3/5 lg:w-2/5 !rounded-lg">
          <form
            onSubmit={(e) =>
              onEnterSearch(
                e,
                { selectedBrand, excludedBrands, selectedColour, itemCategory, priceRange, currencyType, itemName },
                itemType,
                setIsSearching,
                searchedItems,
                setSearchedItems,
                handleClose
              )
            }
            id="filter-form"
            className="flex flex-col space-y-4 w-full flex-wrap ml-0"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold mb-0">Filters</h1>
              <CloseIcon onClick={handleClose} className="cursor-pointer !text-neutral-400" />
            </div>
            <hr className="dark:border-neutral-500" />
            <div className="space-y-4 overflow-y-auto">
              <BrandSelector
                brandsToId={brandsToId}
                setSelectedBrand={setSelectedBrand}
                selectedBrand={selectedBrand}
              />
              <ExcludeBrandSelector
                brandsToId={brandsToId}
                setExcludedBrands={setExcludedBrands}
                excludedBrands={excludedBrands}
              />
              <ColourFilter
                coloursToId={coloursToId}
                setSelectedColour={setSelectedColour}
                selectedColour={selectedColour}
              />
              <ItemCategoryFilter
                itemCategoriesToId={itemCategoriesToId}
                setItemCategory={setItemCategory}
                itemCategory={itemCategory}
              />
              <PriceSelector
                setPriceRange={setPriceRange}
                setCurrencyType={setCurrencyType}
                priceRange={priceRange}
                currencyType={currencyType}
              />
              <NameSelector setItemName={setItemName} itemName={itemName} />
            </div>
            <div className="flex space-x-2 ml-0">
              <Button className={`btn ${itemType} !h-fit !normal-case`} type="submit">
                Search
              </Button>
              <Button className="!bg-neutral-500 !text-white !normal-case" type="button" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default FilterModal;
