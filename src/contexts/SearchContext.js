import { createContext, useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmptyObject } from "../searchUtils";
import constants from "../constants";

const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const state = useSelector((state) => state);
  const userId = useSelector(state => state.id);

  const [isSearching, setIsSearching] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [sortedItems, setSortedItems] = useState([]);

  const [brands, setBrands] = useState([]);
  const [colours, setColours] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allBrands, setAllBrands] = useState({});

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const [searchingFor, setSearchingFor] = useState("");
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const search = async (params, itemType) => {
    try {
      setIsSearching(true);

      window.scrollTo(0, 0);

      if (searchedItems.length !== 0) {
        setSearchedItems([]);
      }

      const reqParams = new URLSearchParams();
      if (params.selectedBrand && !isEmptyObject(params.selectedBrand)) {
        reqParams.append("brandId", params.selectedBrand.brandId);
      }
      if (params.selectedColour && !isEmptyObject(params.selectedColour)) {
        reqParams.append("colourId", params.selectedColour.categoryId);
      }
      if (params.itemCategory && !isEmptyObject(params.itemCategory)) {
        reqParams.append("itemCategoryId", params.itemCategory.categoryId);
      }
      if (params.priceRange) {
        reqParams.append("minPrice", params.priceRange[0]);
        reqParams.append("maxPrice", params.priceRange[1]);
      }
      if (params.itemName) {
        reqParams.append("itemName", params.itemName);
      }
      if (params.currencyType) {
        reqParams.append("currencyType", params.currencyType);
      }
      if (params.excludedBrands && params.excludedBrands.length > 0) {
        reqParams.append("excludedBrands", params.excludedBrands.map(brand => brand.brandId).join(','));
      }
      reqParams.append("itemType", itemType);

      const response = await fetch(constants.backend.API + constants.backend.SEARCH + "?" + reqParams.toString());
      const data = await response.json();
      setSearchedItems(data.items);

      let sorted = [];
      if (sortBy === 'increasing') {
        sorted = [...data.items].sort((a, b) => a.sellPrice - b.sellPrice);
      } else if (sortBy === 'decreasing') {
        sorted = [...data.items].sort((a, b) => b.sellPrice - a.sellPrice);
      }
      setSortedItems(sorted);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const onEnterSearch = (e, params, itemType, handleClose) => {
    e.preventDefault();
    if (handleClose) {
      handleClose();
    }
    search(params, itemType);
  };

  const initializeSearchData = async (itemType) => {
    try {
      const response = await fetch(constants.backend.API + constants.backend.GET_BRANDS + "?onlySellable=true");
      const data = await response.json();

      setAllBrands(data.brandsIdToName || {});
      setBrands(data.brands || []);
      setColours(data.colours || []);

      // Set categories based on item type
      if (itemType === 'fashion' && data.fashionItemCategories) {
        setCategories(data.fashionItemCategories);
      } else if (itemType === 'interior' && data.interiorItemCategories) {
        setCategories(data.interiorItemCategories);
      }

      return data;
    } catch (error) {
      console.error('Error fetching search data:', error);
      return null;
    }
  };

  const updateSearchingBrand = (event) => {
    setSearchingFor(event.target.value);
  };

  const getBrands = async () => {
    setIsMakingRequest(true);
    try {
      const response = await fetch(constants.backend.API + constants.backend.GET_BRANDS);
      const data = await response.json();
      setBrands(data.brands || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setIsMakingRequest(false);
    }
  };

  const contextValue = {
    // Search state
    isSearching,
    setIsSearching,
    searchedItems,
    setSearchedItems,
    sortBy,
    setSortBy,
    sortedItems,
    setSortedItems,

    // Data state
    brands,
    setBrands,
    colours,
    setColours,
    categories,
    setCategories,
    allBrands,
    setAllBrands,

    // UI state
    showScrollToTop,
    setShowScrollToTop,

    // Brand search state
    searchingFor,
    setSearchingFor,
    isMakingRequest,
    setIsMakingRequest,

    // Functions
    search,
    onEnterSearch,
    initializeSearchData,
    scrollToTop,
    updateSearchingBrand,
    getBrands,

    // Redux state
    userId,
    state
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
}
