import { useState } from 'react';
import constants from "../constants";
import './../App.css';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';

import ButtonGroup from '@mui/joy/ButtonGroup';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';


const defaultMin = 2;
const defaultMax = 600;

function valuetext(value) {
  return `${value}°C`;
}

const PriceSelector = () => {
  const [value, setValue] = useState([defaultMin, defaultMax]);
  const [selectedBtn, setSelectedBtn] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let minPriceInput = document.querySelector('[data-id="' + constants.filterValuesIds.FASHION_MIN_PRICE + '"] input');
    let maxPriceInput = document.querySelector('[data-id="' + constants.filterValuesIds.FASHION_MAX_PRICE + '"] input');
    minPriceInput.value = newValue[0];
    maxPriceInput.value = newValue[1];
  };

  function priceRangeChangeFromInput() {
    let minPriceInputValue = document.querySelector('[data-id="' + constants.filterValuesIds.FASHION_MIN_PRICE + '"] input').value;
    let maxPriceInputValue = document.querySelector('[data-id="' + constants.filterValuesIds.FASHION_MAX_PRICE + '"] input').value;
    setValue([minPriceInputValue, maxPriceInputValue]);
  }

  return (
    <div className='flex flex-col space-y-2'>
      <div className="flex flex-row space-x-8">
        <FormControl>
          <FormLabel>Currency Type</FormLabel>
          <ButtonGroup variant="outlined" aria-label="Currency Type Select">
            <Button
              className={selectedBtn === 0 ? constants.filterValuesIds.SELECTED_CURRENCY + " !bg-primary" : " !bg-neutral-100 dark:!bg-neutral-800 dark:!text-white"} id="0"
              style={{ fontWeight: "normal" }}
              variant={selectedBtn === 0 ? "soft" : ""} onClick={() => setSelectedBtn(0)}>
              N/A
            </Button>
            <Button
              className={selectedBtn === 1 ? constants.filterValuesIds.SELECTED_CURRENCY + " !bg-primary" : " !bg-neutral-100 dark:!bg-neutral-800"} id="1"
              variant={selectedBtn === 1 ? "soft" : ""} onClick={() => setSelectedBtn(1)}>
              <StardollarIcon />
            </Button>
            <Button
              className={selectedBtn === 2 ? constants.filterValuesIds.SELECTED_CURRENCY + " !bg-primary" : " !bg-neutral-100 dark:!bg-neutral-800"} id="2"
              variant={selectedBtn === 2 ? "soft" : ""} onClick={() => setSelectedBtn(2)}>
              <StarcoinIcon />
            </Button>
          </ButtonGroup>
        </FormControl>

        <div className={`flex flex-row space-x-2 ${selectedBtn === 0 ? "hidden" : ""}`}>
          <FormControl>
            <FormLabel>Min</FormLabel>
            <Input type="number" data-id={constants.filterValuesIds.FASHION_MIN_PRICE} min={defaultMin} max={defaultMax}
              onChange={priceRangeChangeFromInput} defaultValue={defaultMin} className='my-input font-normal h-9 w-[4.5rem] text-clip' />
          </FormControl>
          <FormControl>
            <FormLabel>Max</FormLabel>
            <Input type="number" data-id={constants.filterValuesIds.FASHION_MAX_PRICE} min={defaultMin} max={defaultMax}
              onChange={priceRangeChangeFromInput} defaultValue={defaultMax} className='my-input font-normal h-9 w-[4.5rem]' />
          </FormControl>
        </div>
      </div>

      <FormControl className={`flex flex-col row ${selectedBtn === 0 ? "!hidden" : ""} ml-0 mr-2`}>
        <FormLabel>Price Range</FormLabel>
        <div className='pl-2'>
          <Slider getAriaLabel={() => 'Starcoins'} value={value} onChange={handleChange} valueLabelDisplay="auto"
            color='neutral'
            className="pb-0"
            getAriaValueText={valuetext} min={defaultMin} max={defaultMax} id={constants.filterValuesIds.FASHION_PRICE} />
        </div>
      </FormControl>
    </div>
  );
}

export default PriceSelector;
