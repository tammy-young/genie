import { useState, useEffect } from 'react';

import NameSelector from './nameSelector.js';
import BrandSelector from './brandSelector.js';
import PriceSelector from './priceSelector.js';

import "./../App.css";
import constants from '../constants.js';
import axios from 'axios';
import { reset } from '../searchUtils.js';
import ExcludeBrandSelector from './excludeBrandSelector.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const FilterModal = ({ search, setSearchedItems, setIsSearching, startSearchMessage }) => {

  const [brandsToId, setBrandsToId] = useState([]);
  const itemType = window.location.pathname.split('/')[1] || "fashion";

  // filter modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getBrands = async () => {
    try {
      const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);

      let brandsIdToName = response.data.brandsIdToName;
      let brandsNameToId = response.data.brandsNameToId;

      let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
      let brandsNameToIdHidden = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
      brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);
      brandsNameToIdHidden.innerHTML = JSON.stringify(brandsNameToId);

      let formattedBrandsList = [];
      for (const [key, value] of Object.entries(brandsNameToId)) {
        formattedBrandsList.push({ 'name': key, 'brandId': value });
      }
      setBrandsToId(formattedBrandsList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (brandsToId.length === 0) {
      getBrands();
    }
    // eslint-disable-next-line
  }, []);

  function submitForm(e) {
    e.preventDefault();
    handleClose();
    search();
  }

  return (
    <div>
      <Button onClick={handleOpen} className='!bg-primary !text-white'>Filters</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="dark:!bg-[#1f2023] dark:!text-white p-4 md:w-1/2 lg:w-1/3 w-5/6 !rounded-lg">
          <form onSubmit={(e) => submitForm(e)} id="filter-form" className='flex flex-col space-y-4 w-full flex-wrap ml-0'>
            <h1 className='font-bold'>Filters</h1>
            <BrandSelector brandsToId={brandsToId} />
            <ExcludeBrandSelector brandsToId={brandsToId} />
            <PriceSelector />
            <NameSelector />
            <div className='flex space-x-4 ml-0'>
              <button className={`btn ${itemType} !h-fit`} id={constants.buttonIds.SEARCH_BTN} type="submit">Search</button>
              <button className='btn btn-secondary h-fit' id={constants.buttonIds.RESET_BTN} onClick={() => reset(setSearchedItems, setIsSearching, startSearchMessage)}>Reset</button>
            </div>
          </form>
        </Box>
      </Modal>

    </div>

  );
}

export default FilterModal;
