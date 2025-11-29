import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FormControl, FormLabel, Input } from "@mui/joy";
import constants from "../constants";
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BrandSelector from "../components/filters/brandFilter";
import ExcludeBrandSelector from "../components/filters/excludeBrandFilter";
import ColourFilter from "../components/filters/colourFilter";
import ItemCategoryFilter from "../components/filters/itemCategoryFilter";
import { FilledButton, OutlinedButton } from '../components/Button';
import { Modal, Box } from "@mui/material";
import { style } from './../containers/filterModal.js';
import ItemNameFilter from "../components/filters/itemNameFilter";
import PriceSelector from "../components/filters/priceFilter.js";
import Snackbar from '@mui/material/Snackbar';

function DeleteFilterModal({ filter, open, onClose }) {
  const dispatch = useDispatch();

  function deleteFilter() {
    fetch(`${constants.backend.API}${constants.backend.FILTERS}/${filter.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatch({ type: 'DELETE_FILTER', payload: filter.id });
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box sx={style} className="dark:!bg-neutral-800 dark:!text-white w-[95%] sm:w-3/5 lg:w-2/5 !rounded-lg">
        <div className='p-4 flex flex-col sm:gap-1'>
          <div className="flex justify-between items-center">
            <h1 className="font-bold mb-0 sm:text-3xl text-2xl">Confirm Delete</h1>
          </div>
          <hr className="dark:border-neutral-500" />
          <p>Are you sure you want to delete this filter?</p>
          <div className='flex justify-end space-x-4'>
            <button
              className='px-4 py-2 font-semibold rounded-xl bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-500 transition-all duration-200'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className='px-4 py-2 font-semibold rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-200'
              onClick={deleteFilter}
            >
              Delete
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

function FilterItem({ filter, filterOptions, setFilters }) {
  const [open, setOpen] = useState(filter.open || false);
  const [filterData, setFilterData] = useState(filter);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.id);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function addFilter(e) {
    e.preventDefault();

    const body = {
      name: filterData.name,
      userId: userId,
      query: filterData.query
    }

    fetch(`${constants.backend.API}${constants.backend.FILTERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'ADD_FILTER', payload: data });
        setFilterData(data);
        closeFilter();
        setFilters(prev => prev.map((f, index) => index !== prev.length - 1 ? f : data));
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function updateFilter(e) {
    e.preventDefault();

    const body = {
      name: filterData.name,
      userId: userId,
      query: filterData.query
    }

    fetch(`${constants.backend.API}${constants.backend.FILTERS}/${filterData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'UPDATE_FILTER', payload: data });
        setFilterData(data);
        closeFilter();
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function closeFilter() {
    setOpen(false);
  }

  return (
    <div className="flex flex-col border-[1px] dark:border-neutral-500 rounded-xl overflow-hidden mb-3">
      <div
        className="p-3 flex justify-between items-center bg-neutral-200 dark:bg-neutral-800 cursor-pointer"
        onClick={() => {
          if (open) {
            closeFilter();
          } else {
            setOpen(true);
          }
        }}
      >
        <h2 className="dark:text-white text-xl m-0 p-0">{filterData.name || "Untitled"}</h2>
        <KeyboardArrowDownIcon className={`dark:!text-white transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && <hr className="dark:border-neutral-700 p-0 m-0" />}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <form
          className="flex flex-col gap-3 p-3"
          onSubmit={filter.id ? updateFilter : addFilter}
        >
          <div className="grid sm:grid-rows-2 sm:grid-cols-2 gap-3">
            <FormControl>
              <FormLabel className="dark:!text-white">Filter Name *</FormLabel>
              <Input
                placeholder="Enter filter name" value={filterData.name}
                onChange={(e) => setFilterData({ ...filterData, name: e.target.value })}
                className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
                required
              />
            </FormControl>
            <BrandSelector
              brandsToId={filterOptions.brands}
              setSelectedBrand={(value) => setFilterData({ ...filterData, query: { ...filterData.query, brand: value } })}
              selectedBrand={filterData.query?.brand}
            />
            <ExcludeBrandSelector
              brandsToId={filterOptions.brands}
              setExcludedBrands={(value) => setFilterData({ ...filterData, query: { ...filterData.query, excludedBrands: value } })}
              excludedBrands={filterData.query?.excludedBrands}
            />
            <ColourFilter
              coloursToId={filterOptions.colours}
              setSelectedColour={(value) => setFilterData({ ...filterData, query: { ...filterData.query, colour: value } })}
              selectedColour={filterData.query?.colour}
            />
            <ItemCategoryFilter
              itemCategoriesToId={filterOptions.fashionItemCategories?.concat(filterOptions.interiorItemCategories)}
              setItemCategory={(value) => setFilterData({ ...filterData, query: { ...filterData.query, itemCategory: value } })}
              itemCategory={filterData.query?.itemCategory}
            />
            <ItemNameFilter
              itemName={filterData.query?.itemName}
              setItemName={(value) => setFilterData({ ...filterData, query: { ...filterData.query, itemName: value } })}
            />
            <div className="sm:col-span-2">
              <PriceSelector
                setPriceRange={(value) => setFilterData({ ...filterData, query: { ...filterData.query, priceRange: value } })}
                setCurrencyType={(value) => setFilterData({ ...filterData, query: { ...filterData.query, currencyType: value } })}
                priceRange={filterData.query?.priceRange}
                currencyType={filterData.query?.currencyType}
                errors={{}}
                setErrors={() => { }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <FilledButton type="submit">
              Save
            </FilledButton>
            {
              filter.id ? (
                <FilledButton type="button" className="!bg-red-600" onClick={() => setDeleteModalOpen(true)}>
                  Delete
                </FilledButton>
              ) : null
            }
            <OutlinedButton type="button" onClick={closeFilter}>
              Cancel
            </OutlinedButton>
          </div>
        </form>
      </Collapse>
      <DeleteFilterModal filter={filter} open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message="Filter saved successfully"
      />
    </div>
  )
}

export default function FilterSection({ profile }) {
  const [filters, setFilters] = useState(profile.filters || []);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    fetch(`${constants.backend.API}${constants.backend.GET_BRANDS}`)
      .then(response => response.json())
      .then(data => {
        setFilterOptions(data);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });
  }, []);

  function addFilter() {
    setFilters([...filters, { name: "", query: { priceRange: [2, 600] }, open: true }]);
  }

  return (
    <div>
      <div className="table">
        {
          filters.map((filter, index) => (
            <FilterItem key={index} filter={filter} filterOptions={filterOptions} setFilters={setFilters} />
          ))
        }
      </div>
      <button
        className={`!bg-primary px-3 py-2 rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !text-white`}
        onClick={addFilter}
      >
        <span className='mb-0 font-semibold'>Add Filter</span>
      </button>
    </div>
  )
}