import { useEffect } from 'react';
import { useSearchContext } from '../contexts/SearchContext';

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
  const {
    isSearching,
    searchedItems,
    brands,
    setBrands,
    setColours,
    setCategories,
    showScrollToTop,
    scrollToTop,
    sortBy,
    sortedItems,
    userId,
    search
  } = useSearchContext();

  useEffect(() => {
    document.title = `${title} | Genie`;
    search({ priceRange: [2, 600] }, itemType);

    // Set default brands if provided
    if (defaultBrands.length > 0) {
      setBrands(defaultBrands);
    }

    // Call the custom initialization function if provided
    if (initializeData) {
      initializeData(setBrands, setColours, setCategories);
    }
    // eslint-disable-next-line
  }, []);

  // Merge default filter props with passed props
  const mergedFilterProps = {
    itemTypeFilter: filterProps.itemTypeFilter,
    brandFilter: filterProps.brandFilter,
    colourFilter: filterProps.colourFilter
  };

  return (
    <div className='flex flex-col h-full relative site-padding flex-1'>
      <div className='sticky top-0 bg-white/95 dark:!bg-neutral-900/80 dark:text-neutral-100 z-50'>
        <h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>{title} for Sale in Starbazaar</h2>
        <div className='pb-4 w-full'>
          <Filters {...mergedFilterProps} />
        </div>
      </div>

      <div className='flex flex-wrap w-full sm:gap-4 justify-center pb-4 sm:space-y-0 space-y-4 mt-1 flex-1 min-h-0'>
        {
          (
            isSearching && (
              <LoadingIndicator />
            )
          ) || (
            sortBy === 'relevance' ? (
              (searchedItems.length !== 0 && !isSearching) &&
              searchedItems.map((item, index) => (
                <ItemCard
                  key={index}
                  item={item}
                  itemType={itemType}
                  allBrands={brands}
                  userId={userId}
                />
              ))
            ) : (
              (sortedItems.length !== 0 && !isSearching) &&
              sortedItems.map((item, index) => (
                <ItemCard
                  key={index}
                  item={item}
                  itemType={itemType}
                  allBrands={brands}
                  userId={userId}
                />
              ))
            )
          ) || (
            (
              (searchedItems.length === 0 && !isSearching) &&
              <p className="text-gray-600 dark:text-gray-300 text-center">
                No items found matching your criteria.
              </p>
            )
          )
        }
      </div>

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