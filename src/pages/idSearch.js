import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

import { useEffect, useState } from 'react';
import axios from 'axios';

import constants from '../constants';
import '../App.css';

const IdSearch = () => {

  const [searchingFor, setSearchingFor] = useState("");
  const [brands, setBrands] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const updateSearchingBrand = (brand) => {
    setSearchingFor(brand.target.value);
  }

  const getBrands = async () => {
    try {
      const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);
      let brandsIdToName = response.data.brandsIdToName;
      setBrands(Object.entries(brandsIdToName).map((brand) => ({ name: brand[1], id: brand[0] })).sort((a, b) => a.name.localeCompare(b.name)));
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
      <div className='!sticky top-0 absolute dark:!bg-neutral-900 bg-[#ffffff] w-full z-[10]'>
        <FormControl>
          <h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>All Brands</h2>
          <FormLabel>Brand Name</FormLabel>
          <Input className='sm:w-1/2 w-full' data-id={constants.brandIdSearchPage.BRAND_ID_SEARCH_INPUT}
            onChange={updateSearchingBrand} placeholder='Start typing...' />
          <br>
          </br>
        </FormControl>
      </div>
      <div className="flex flex-wrap gap-4 justify-center pb-4">
        {brands
          .filter(brand => {
            const searchedBrand = searchingFor.toLowerCase();
            const brandName = brand.name.toLowerCase();
            return (searchedBrand && brandName.includes(searchedBrand)) || searchedBrand === "";
          })
          .map((brand, index) => (
            <div key={index} className="p-4 lg:w-[23%] md:w-[30%] sm:w-[48%] w-full rounded dark:!bg-neutral-800 dark:!border-none" style={{ border: '1px solid #dee2e6' }}>
              <p className='p-0 m-0 text-xl font-bold'>{brand.name}</p>
              <div className='flex flex-row items-center space-x-1'>
                <p className='p-0 m-0'>ID: {brand.id}</p>
                <IconButton className={`!p-0 pr-1`} onClick={() => navigator.clipboard.writeText(brand.id)} aria-label="Copy Username">
                  <ContentCopyIcon style={{ width: '17px' }} className='text-neutral-400 dark:text-neutral-300' />
                </IconButton>
              </div>
            </div>
          ))
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
