import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import { useEffect, useState } from 'react';
import axios from 'axios';

import constants from '../constants';
import './../App.css';

const IdSearch = () => {

  const [searchingFor, setSearchingFor] = useState("");
  const [brands, setBrands] = useState([]);

  const updateSearchingBrand = (brand) => {
    setSearchingFor(brand.target.value);
  }

  const getBrands = async () => {
    try {
      const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);
      let brandsNameToId = response.data.brandsNameToId;
      setBrands(Object.entries(brandsNameToId).map((brand) => ({ name: brand[0], id: brand[1] })).sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    getBrands();
    document.title = 'Brands | Genie';
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='!sticky top-0 absolute dark:bg-neutral-900 bg-white w-full'>
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
            <div key={index} className="p-4 lg:w-[23%] md:w-[30%] w-[40%] border rounded">
              <p className='p-0 m-0 text-xl font-bold'>{brand.name}</p>
              <p className='p-0 m-0'>ID: {brand.id}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default IdSearch;
