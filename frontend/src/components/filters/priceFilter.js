import { useEffect, useState } from 'react';
import constants from "../../constants";
import StardollarIcon from '../images/stardollar';
import StarcoinIcon from '../images/starcoin';

import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';


const defaultMin = 2;
const defaultMax = 600;

const PriceSelector = ({ setPriceRange, setCurrencyType, priceRange, currencyType }) => {
  const [value, setValue] = useState([defaultMin, defaultMax]);
  const [selectedBtn, setSelectedBtn] = useState(0);

  const handleMinInputChange = (event) => {
    const newMin = Math.min(Number(event.target.value), value[1]);
    setValue([newMin, value[1]]);
    setPriceRange([newMin, value[1]]);
  };

  const handleMaxInputChange = (event) => {
    const newMax = Math.max(Number(event.target.value), value[0]);
    setValue([value[0], newMax]);
    setPriceRange([value[0], newMax]);
  };

  const changeCurrencyType = (type) => {
    setCurrencyType(`${type ? type : ''}`);
    setSelectedBtn(type);
  }

  useEffect(() => {
    setSelectedBtn(parseInt(currencyType) || 0);
  }, [currencyType]);

  return (
    <div className="flex flex-row space-x-2">
      <FormControl className="pr-2">
        <FormLabel>Currency Type</FormLabel>
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

      <div className={`flex flex-row space-x-2 ${selectedBtn === 0 ? "hidden" : ""}`}>
        <FormControl>
          <FormLabel>Min</FormLabel>
          <input type="number" id={constants.filterValuesIds.FASHION_MIN_PRICE} min={defaultMin} max={defaultMax}
            onChange={handleMinInputChange} value={value[0]} className='my-input font-normal h-9 w-[4.5rem] text-clip' />
        </FormControl>
        <FormControl>
          <FormLabel>Max</FormLabel>
          <input type="number" id={constants.filterValuesIds.FASHION_MAX_PRICE} min={defaultMin} max={defaultMax}
            onChange={handleMaxInputChange} value={value[1]} className='my-input font-normal h-9 w-[4.5rem]' />
        </FormControl>
      </div>
    </div>
  );
}

export default PriceSelector;
