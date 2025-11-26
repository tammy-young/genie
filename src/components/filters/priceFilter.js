import { useEffect, useState } from 'react';
import constants from "../../constants";
import StardollarIcon from '../images/stardollar';
import StarcoinIcon from '../images/starcoin';

import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';


const defaultMin = 2;
const defaultMax = 600;

const PriceSelector = ({ setPriceRange, setCurrencyType, priceRange, currencyType, errors, setErrors }) => {
  const [value, setValue] = useState([defaultMin, defaultMax]);
  const [selectedBtn, setSelectedBtn] = useState(0);

  const handleMinInputChange = (event) => {
    const newMin = Math.min(Number(event.target.value), value[1]);
    setValue([newMin, value[1]]);
    setPriceRange([newMin, value[1]]);
    if (newMin < defaultMin || newMin > defaultMax) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: `Minimum price must be between ${defaultMin} and ${defaultMax}.`
      }));
    } else {
      setErrors((prevErrors) => {
        const { price, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleMaxInputChange = (event) => {
    const newMax = Math.max(Number(event.target.value), value[0]);
    setValue([value[0], newMax]);
    setPriceRange([value[0], newMax]);
    if (newMax < defaultMin || newMax > defaultMax) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: `Maximum price must be between ${defaultMin} and ${defaultMax}.`
      }));
    } else {
      setErrors((prevErrors) => {
        const { price, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const changeCurrencyType = (type) => {
    setCurrencyType(`${type ? type : ''}`);
    setSelectedBtn(type);
  }

  useEffect(() => {
    setSelectedBtn(parseInt(currencyType) || 0);
  }, [currencyType]);

  return (
    <div className='flex flex-col'>
      <div className="grid grid-rows-1 grid-cols-[170px_1fr] gap-2">
        <FormControl>
          <FormLabel className="dark:!text-white">
            Currency Type
          </FormLabel>
          <ButtonGroup variant="outlined" aria-label="Currency Type Select">
            <Button
              className={selectedBtn === 0 ? constants.filterValuesIds.SELECTED_CURRENCY + " !bg-primary" : " !bg-neutral-100 dark:!bg-neutral-800 dark:!text-white"} id="0"
              style={{ fontWeight: "normal" }}
              variant={selectedBtn === 0 ? "soft" : ""} onClick={() => changeCurrencyType(0)}>
              N/A
            </Button>
            <Button
              className={selectedBtn === 1 ? constants.filterValuesIds.SELECTED_CURRENCY + " !bg-primary" : " !bg-neutral-100 dark:!bg-neutral-800"} id="1"
              variant={selectedBtn === 1 ? "soft" : ""} onClick={() => changeCurrencyType(1)}>
              <StardollarIcon />
            </Button>
            <Button
              className={selectedBtn === 2 ? constants.filterValuesIds.SELECTED_CURRENCY + " !bg-primary" : " !bg-neutral-100 dark:!bg-neutral-800"} id="2"
              variant={selectedBtn === 2 ? "soft" : ""} onClick={() => changeCurrencyType(2)}>
              <StarcoinIcon />
            </Button>
          </ButtonGroup>
        </FormControl>

        <div className={`grid grid-rows-1 grid-cols-2 gap-2 ${selectedBtn === 0 ? "hidden" : ""}`}>
          <FormControl>
            <FormLabel className="dark:!text-white">
              Min
            </FormLabel>
            <Input
              type="number"
              id={constants.filterValuesIds.FASHION_MIN_PRICE} min={defaultMin} max={defaultMax}
              onChange={handleMinInputChange} value={priceRange[0]}
              className='font-normal text-clip dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400 w-full'
            />
          </FormControl>
          <FormControl>
            <FormLabel className="dark:!text-white">
              Max
            </FormLabel>
            <Input type="number"
              id={constants.filterValuesIds.FASHION_MAX_PRICE} min={defaultMin} max={defaultMax}
              onChange={handleMaxInputChange} value={priceRange[1]}
              className='font-normal dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400 w-full'
            />
          </FormControl>
        </div>
      </div>
      {
        errors.price ? (
          <div className="text-red-500 text-sm mb-0 pt-1">
            {errors.price}
          </div>
        ) : null
      }
    </div>
  );
}

export default PriceSelector;
