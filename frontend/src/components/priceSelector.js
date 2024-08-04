import Slider from '@mui/material/Slider';
import Switch from '@mui/joy/Switch';

import { useState } from 'react';
import constants from "../constants";
import './../App.css';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../themes';

const defaultMin = 2;
const defaultMax = 600;


function valuetext(value) {
    return `${value}°C`;
}

const PriceSelector = () => {
    const [value, setValue] = useState([defaultMin, defaultMax]);
    const [stardollars, setCurrency] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        let minPriceInput = document.getElementById(constants.filterValuesIds.FASHION_MIN_PRICE);
        let maxPriceInput = document.getElementById(constants.filterValuesIds.FASHION_MAX_PRICE);
        minPriceInput.value = newValue[0];
        maxPriceInput.value = newValue[1];
    };

    function priceRangeChangeFromInput() {
        let minPriceInputValue = document.getElementById(constants.filterValuesIds.FASHION_MIN_PRICE).value;
        let maxPriceInputValue = document.getElementById(constants.filterValuesIds.FASHION_MAX_PRICE).value;
        setValue([minPriceInputValue, maxPriceInputValue]);
    }

    return(
        <>
            <div className='row'>
                <div className='col'>
                    Price Range
                </div>
            </div>
            <div className="row">
                <div className='col'>
                    <ThemeProvider theme={ theme }>
                        <Slider getAriaLabel={() => 'Starcoins'} value={ value } onChange={ handleChange } valueLabelDisplay="auto" color="stardollPurple"
                            getAriaValueText={ valuetext } min={ defaultMin } max={ defaultMax } id={ constants.filterValuesIds.FASHION_PRICE }/>
                    </ThemeProvider>
                    
                </div>
            </div>
            <div className="row">
                <div className='col'>
                    <label style={{ paddingRight: '10px' }}>
                        Min<br/>
                        <input type="number" id={ constants.filterValuesIds.FASHION_MIN_PRICE } min={ defaultMin } max={ defaultMax }
                            onChange={ priceRangeChangeFromInput } defaultValue={ defaultMin } className='my-input' />
                    </label>
                    <label>
                        Max<br/>
                        <input type="number" id={ constants.filterValuesIds.FASHION_MAX_PRICE } min={ defaultMin } max={ defaultMax }
                            onChange={ priceRangeChangeFromInput } defaultValue={ defaultMax } className='my-input' />
                    </label>
                </div>
                <div className="col">
                    <Switch slotProps={{ input: { 'aria-label': 'dark mode' } }} startDecorator={ <StardollarIcon /> }
                        endDecorator={ <StarcoinIcon /> } checked={ stardollars } onChange={(event) => setCurrency(event.target.checked)}
                        id={ constants.filterValuesIds.FASHION_CURRENCY_TYPE } color="neutral" />
                </div>
            </div>
        </>
    );
}

export default PriceSelector;
