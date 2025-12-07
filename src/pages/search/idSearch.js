import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import { useEffect, useState } from 'react';

import constants from '../../constants';
import LoadingIndicator from '../../components/LoadingIndicator';

const BrandItem = ({ brand }) => {
  return (
    <div
      className="group relative dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-xl !border !border-gray-200 dark:border-none transition-all duration-300 transform p-6 lg:w-[23%] md:w-[30%] sm:w-[48%] w-full h-min min-h-[151px] flex flex-col justify-between"
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
            {brand.brandId}
          </span>
        </div>

        <div className={`text-sm font-medium p-1 px-2 rounded-full ${brand.sellable ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900' : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900'}`}>
          {brand.sellable ? "Sellable" : "Not Sellable"}
        </div>
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
      const response = await fetch(constants.backend.API + constants.backend.GET_BRANDS);
      const data = await response.json();
      setBrands(data.brands);
      setIsMakingRequest(false);
    } catch (error) {
      // console.error('Error fetching brands:', error);
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
    <div className='relative site-padding flex-1 flex flex-col h-full'>
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
      <div className="flex flex-wrap gap-6 justify-center pb-8 pt-4 flex-1 min-h-0 overflow-auto">
        {
          isMakingRequest ? (
            <LoadingIndicator />
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
            className={`fixed bottom-6 right-6 !bg-primary hover:!bg-primary-dark text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform z-50 ${showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
