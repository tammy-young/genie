import { onEnterSearch, getBrands, reset } from "../../searchUtils.js";
import { useState, useEffect } from "react";

import NameSelector from './itemNameFilter.js';
import BrandSelector from './brandFilter.js';
import PriceSelector from './priceFilter.js';
import ExcludeBrandSelector from './excludeBrandFilter.js';

import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const Filters = ({ search, setSearchedItems, setIsSearching, startSearchMessage }) => {
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1024;  // tailwind lg = 1024 px
      setIsSmallScreen(isSmall);

      if (!isSmall) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isSmallScreen ? (
        <div className="lg:!hidden !block w-full">
          <div className="flex space-x-2">
            <Button onClick={handleOpen} className="border !text-black dark:!text-white !normal-case">
              Filters
            </Button>
            <Button
              onClick={(e) =>
                onEnterSearch(e, search, { selectedBrand, excludedBrands, priceRange, currencyType, itemName })
              }
              className={`${itemType} !text-white !normal-case`}
            >
              Search
            </Button>
            <Button
              className="!bg-neutral-500 !text-white !normal-case"
              type="button"
              onClick={() => reset(setSearchedItems, setIsSearching, startSearchMessage)}
            >
              Reset
            </Button>
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style} className="dark:!bg-[#1f2023] dark:!text-white p-4 md:w-1/2 lg:w-1/3 w-5/6 !rounded-lg">
              <form
                onSubmit={(e) =>
                  onEnterSearch(e, search, { selectedBrand, excludedBrands, priceRange, currencyType, itemName }, handleClose)
                }
                id="filter-form"
                className="flex flex-col space-y-4 w-full flex-wrap ml-0"
              >
                <div className="flex justify-between items-center">
                  <h1 className="font-bold mb-0">Filters</h1>
                  <CloseIcon onClick={handleClose} className="cursor-pointer" />
                </div>
                <hr className="dark:border-neutral-500" />
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
                <PriceSelector
                  setPriceRange={setPriceRange}
                  setCurrencyType={setCurrencyType}
                  priceRange={priceRange}
                  currencyType={currencyType}
                />
                <NameSelector setItemName={setItemName} itemName={itemName} />
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
      ) : (
        <form className="lg:flex hidden w-full flex-wrap !flex-row"
          onSubmit={(e) =>
            onEnterSearch(e, search, { selectedBrand, excludedBrands, priceRange, currencyType, itemName }, handleClose)
          }>
          <div className="flex flex-row space-x-4 min-w-fit flex-wrap ml-0 lg:pr-4">
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
            <PriceSelector
              setPriceRange={setPriceRange}
              setCurrencyType={setCurrencyType}
              priceRange={priceRange}
              currencyType={currencyType}
            />
            <NameSelector setItemName={setItemName} itemName={itemName} />
          </div>
          <div className="flex space-x-2 lg:mt-[1.6rem]">
            <Button className={`btn ${itemType} !h-fit !normal-case`} type="submit">
              Search
            </Button>
            <Button className="!bg-neutral-500 !h-fit !text-white !normal-case" type="button" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button
              className="!bg-neutral-400 !h-fit !text-white !normal-case"
              type="button"
              onClick={() => reset(setSearchedItems, setIsSearching, startSearchMessage)}
            >
              Reset
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Filters;
