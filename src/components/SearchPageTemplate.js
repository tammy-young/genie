import { useState, useEffect } from 'react';
import { search } from '../searchUtils.js';
import { useSelector } from 'react-redux';

import Filters from './filters/filters.js';
import ItemCard from './itemCard.js';
import LoadingIndicator from './LoadingIndicator.js';

const SearchPageTemplate = ({
  itemType,
  title,
  initializeData,
  filterProps = {},
  buttonColors = { bg: 'bg-blue-500', hover: 'hover:bg-blue-600' },
  defaultBrands = []
}) => {
  // for searching
  const [isSearching, setIsSearching] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [brands, setBrands] = useState(defaultBrands);
  const [colours, setColours] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const userId = useSelector(state => state.id);
  const [sortBy, setSortBy] = useState('relevance');
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    document.title = `${title} | Genie`;
    search({ priceRange: [2, 600] }, itemType, setIsSearching, searchedItems, setSearchedItems, sortBy, setSortedItems);

    // Call the custom initialization function if provided
    if (initializeData) {
      initializeData(setBrands, setColours, setCategories);
    }
    // eslint-disable-next-line
  }, []);

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

  // useEffect(() => {
  //   let items = [...searchedItems];
  //   if (sortBy === 'increasing') {
  //     items.sort((a, b) => a.sellPrice - b.sellPrice);
  //   } else if (sortBy === 'decreasing') {
  //     items.sort((a, b) => b.sellPrice - a.sellPrice);
  //   }
  //   setSortedItems(items);
  // }, [sortBy]);

  // Merge default filter props with passed props
  const mergedFilterProps = {
    setIsSearching,
    isSearching,
    searchedItems,
    setSearchedItems,
    brandsToId: brands,
    coloursToId: colours,
    itemCategoriesToId: categories,
    sortBy,
    setSortBy,
    sortedItems,
    setSortedItems,
    ...filterProps
  };

  return (
    <div className='flex flex-col h-full relative site-padding flex-1'>
      <div className='sticky top-0 bg-white/95 dark:!bg-neutral-900/80 dark:text-neutral-100 z-50'>
        <h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>{title} for Sale in Starbazaar</h2>
        <div className='pb-4 w-full'>
          <Filters {...mergedFilterProps} />
        </div>
      </div>

      {
        (
          isSearching && (
            <div className='flex flex-wrap w-full sm:gap-4 justify-center pb-4 sm:space-y-0 space-y-4 mt-1 flex-1 min-h-0'>
              <LoadingIndicator />
            </div>
          )
        ) || (
          sortBy === 'relevance' ? (
            searchedItems.length !== 0 && !isSearching && (
              <div className='flex flex-wrap w-full sm:gap-4 justify-center items-stretch content-start pb-4 sm:space-y-0 space-y-4 mt-1'>
                {
                  searchedItems.map((item, index) => (
                    <ItemCard
                      key={index}
                      item={item}
                      itemType={itemType}
                      allBrands={brands}
                      userId={userId}
                    />
                  ))
                }
              </div>
            )
          ) : (
            sortedItems.length !== 0 && !isSearching && (
              <div className='flex flex-wrap w-full sm:gap-4 justify-center items-stretch content-start pb-4 sm:space-y-0 space-y-4 mt-1'>
                {
                  sortedItems.map((item, index) => (
                    <ItemCard
                      key={index}
                      item={item}
                      itemType={itemType}
                      allBrands={brands}
                      userId={userId}
                    />
                  ))
                }
              </div>
            )
          )
        ) || (
          searchedItems.length === 0 && !isSearching && (
            <div className='flex flex-wrap w-full sm:gap-4 justify-center items-start pb-4 sm:space-y-0 space-y-4 mt-1 flex-1 min-h-0'>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                No items found matching your criteria.
              </p>
            </div>
          )
        )
      }

      {
        showScrollToTop && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 ${buttonColors.bg} ${buttonColors.hover} ${buttonColors.textColor || 'text-white'} p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform z-50 ${showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )
      }
    </div>
  );
};

export default SearchPageTemplate;