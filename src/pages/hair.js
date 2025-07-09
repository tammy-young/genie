import { useState, useEffect } from 'react';
import '../App.css';
import { search } from '../searchUtils.js';
import axios from 'axios';
import constants from '../constants.js';

import Filters from '../components/filters/filters.js';
import ItemCard from '../components/itemCard.js';


const HairSearch = () => {
  // for searching
  const [isSearching, setIsSearching] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [allBrands, setAllBrands] = useState({});
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    document.title = 'Hair | Genie';
    search({ priceRange: [2, 600] }, "hair", setIsSearching, searchedItems, setSearchedItems);
    axios.get(constants.backend.API + constants.backend.GET_BRANDS)
      .then((response) => {
        let brandsIdToName = response.data.brandsIdToName;
        setAllBrands(brandsIdToName);
      })
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

  return (
    <div className='flex flex-col h-full relative'>
      <div className='sticky top-0 dark:!bg-neutral-900 dark:text-neutral-100 !bg-white z-50'>
        <h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>Hair for Sale in Starbazaar</h2>
        <div className='pb-4 w-full'>
          <Filters
            setIsSearching={setIsSearching}
            searchedItems={searchedItems}
            setSearchedItems={setSearchedItems}
            modal={true}
            allBrands={allBrands}
            itemTypeFilter={false}
            brandFilter={false}
            colourFilter={false}
          />
        </div>
      </div>

      <div className='flex flex-wrap w-full sm:gap-4 justify-center pb-4 sm:space-y-0 space-y-4'>
        {
          (
            isSearching && (
              <div className={`w-full flex justify-center items-center h-full max-h-full ${isSearching ? 'block' : 'hidden'}`}>
                <img src={process.env.PUBLIC_URL + "sd-loading.gif"} alt="Searching..." style={{ alignSelf: "center" }} />
              </div>
            )
          ) || (
            (searchedItems.length !== 0 && !isSearching) &&
            searchedItems.map((item, index) => (
              <ItemCard item={item} index={index} itemType={"hair"} allBrands={allBrands} />
            ))
          ) || (
            (
              (searchedItems.length === 0 && !isSearching) &&
              <div className='flex justify-center items-center w-full h-full flex-col space-y-1'>
                <p className='m-0 p-0'>No items found.</p>
                <p className='m-0 p-0'>Clear filters and try again!</p>
              </div>
            )
          )
        }
      </div>

      {
        showScrollToTop && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 bg-hair hover:bg-hair-dark text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 ${showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
  )
}

export default HairSearch;
