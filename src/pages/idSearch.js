import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

import { useEffect, useState } from 'react';
import axios from 'axios';

import constants from '../constants';
import '../App.css';

const BrandItem = ({ brand }) => {
  return (
    <div
      className="group relative dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-xl !border !border-gray-200 dark:border-none transition-all duration-300 transform hover:scale-[1.02] p-6 lg:w-[23%] md:w-[30%] sm:w-[48%] w-full min-h-[120px] flex flex-col justify-between"
    >
      <div className="flex-1 flex items-start pb-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors duration-200">
          {brand.name}
        </h3>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 dark:border-neutral-700 pt-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-neutral-400">
            ID:
          </span>
          <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-neutral-700 px-2 py-1 rounded-md">
            {brand.id}
          </span>
        </div>

        <IconButton
          className="!p-2 !min-w-0 hover:!bg-primary/10 dark:hover:!bg-primary/20 rounded-full transition-all duration-200 transform hover:scale-110 group-hover:!bg-primary/5"
          onClick={() => navigator.clipboard.writeText(brand.id)}
          aria-label="Copy Brand ID"
        >
          <ContentCopyIcon
            style={{ width: '18px' }}
            className="text-gray-500 dark:text-neutral-400 group-hover:text-primary transition-colors duration-200"
          />
        </IconButton>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}

const IdSearch = () => {

  const [searchingFor, setSearchingFor] = useState("");
  const [brands, setBrands] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const updateSearchingBrand = (brand) => {
    setSearchingFor(brand.target.value);
  }

  const getBrands = async () => {
    setIsMakingRequest(true);
    try {
      const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);
      let brandsIdToName = response.data.brandsIdToName;
      setBrands(Object.entries(brandsIdToName).map((brand) => ({ name: brand[1], id: brand[0] })).sort((a, b) => a.name.localeCompare(b.name)));
      setIsMakingRequest(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    getBrands();
    document.title = 'Brands | Genie';
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
    <div className='relative'>
      <div className='sticky top-0 bg-white/95 dark:bg-neutral-900/80 backdrop-blur-sm w-full z-10 pb-4'>
        <h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>All Brands</h2>
        <FormControl className="max-w-md">
          <FormLabel className="text-gray-700 dark:text-neutral-300 dark:!text-white">
            Search Brand Name
          </FormLabel>
          <Input
            data-id={constants.brandIdSearchPage.BRAND_ID_SEARCH_INPUT}
            onChange={updateSearchingBrand}
            placeholder='Start typing to search brands...'
            className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
          />
        </FormControl>
      </div>
      <div className="flex flex-wrap gap-6 justify-center pb-8 pt-4">
        {
          isMakingRequest ? (
            <div className={`w-full flex justify-center items-center h-full max-h-full ${isMakingRequest ? 'block' : 'hidden'}`}>
              <img src={process.env.PUBLIC_URL + "sd-loading.gif"} alt="Searching..." style={{ alignSelf: "center" }} />
            </div>
          ) : (
            brands
              .filter(brand => {
                const searchedBrand = searchingFor.toLowerCase();
                const brandName = brand.name.toLowerCase();
                return (searchedBrand && brandName.includes(searchedBrand)) || searchedBrand === "";
              })
              .map((brand, index) => (
                <BrandItem brand={brand} key={index} />
              ))
          )
        }
      </div>

      {
        showScrollToTop && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 !bg-primary hover:!bg-primary-dark text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 ${showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
}

export default IdSearch;
