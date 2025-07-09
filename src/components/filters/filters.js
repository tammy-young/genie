import { getFilters } from "../../searchUtils.js";
import { useState, useEffect } from "react";

import FilterModal from "./containers/filterModal.js";

const Filters = ({ setIsSearching, searchedItems, setSearchedItems, itemTypeFilter = true, brandFilter = true, colourFilter = true }) => {
  const [brandsToId, setBrandsToId] = useState([]);
  const [coloursToId, setColoursToId] = useState([]);
  const [itemCategoriesToId, setItemCategoriesToId] = useState([]);
  const itemType = window.location.pathname.split('/')[1] || "fashion";

  const [selectedBrand, setSelectedBrand] = useState({});
  const [excludedBrands, setExcludedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([2, 600]);
  const [currencyType, setCurrencyType] = useState('');
  const [itemName, setItemName] = useState('');
  const [selectedColour, setSelectedColour] = useState({});
  const [itemCategory, setItemCategory] = useState({});

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (brandsToId.length === 0) {
      getFilters(setBrandsToId, setColoursToId, setItemCategoriesToId, itemType);
    }
    // eslint-disable-next-line
  }, []);

  function clearFilters() {
    setSelectedBrand({});
    setExcludedBrands([]);
    setPriceRange([2, 600]);
    setCurrencyType('');
    setItemName('');
    setSelectedColour({});
    setItemCategory({});
    setErrors({});
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <FilterModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      selectedBrand={selectedBrand}
      setSelectedBrand={setSelectedBrand}
      excludedBrands={excludedBrands}
      setExcludedBrands={setExcludedBrands}
      selectedColour={selectedColour}
      setSelectedColour={setSelectedColour}
      itemCategory={itemCategory}
      setItemCategory={setItemCategory}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      currencyType={currencyType}
      setCurrencyType={setCurrencyType}
      itemName={itemName}
      setItemName={setItemName}
      itemType={itemType}
      setIsSearching={setIsSearching}
      searchedItems={searchedItems}
      setSearchedItems={setSearchedItems}
      brandsToId={brandsToId}
      coloursToId={coloursToId}
      itemCategoriesToId={itemCategoriesToId}
      clearFilters={clearFilters}
      itemTypeFilter={itemTypeFilter}
      brandFilter={brandFilter}
      colourFilter={colourFilter}
      errors={errors}
      setErrors={setErrors}
    />
  )
}

export default Filters;
