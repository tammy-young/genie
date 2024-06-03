import Slider from '@mui/material/Slider';
import Switch from '@mui/joy/Switch';

import { useState, useEffect } from 'react';
import constants from "../constants";
import './../App.css';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';


function valuetext(value) {
    return `${value}°C`;
}

const PriceSelector = () => {
    const [value, setValue] = useState([2, 600]);
    const [stardollars, setCurrency] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        let priceInput = document.getElementById(constants.filterValuesIds.FASHION_PRICE);
        let priceInputValue = priceInput.innerText;
        let minPrice = priceInputValue.split("\n")[0];
        let maxPrice = priceInputValue.split("\n")[1];
        let minPriceInput = document.getElementById(constants.filterValuesIds.FASHION_MIN_PRICE);
        let maxPriceInput = document.getElementById(constants.filterValuesIds.FASHION_MAX_PRICE);
        minPriceInput.value = minPrice;
        maxPriceInput.value = maxPrice;
    }, [value]);

    function priceRangeChangeFromInput() {
        let minPriceInputValue = document.getElementById(constants.filterValuesIds.FASHION_MIN_PRICE).value;
        let maxPriceInputValue = document.getElementById(constants.filterValuesIds.FASHION_MAX_PRICE).value;
        setValue([minPriceInputValue, maxPriceInputValue]);
    }

    return(
        <>
            <div className="row">
                <div className='col'>
                    <Slider getAriaLabel={() => 'Starcoins'} value={ value } onChange={ handleChange } valueLabelDisplay="auto" color="info"
                        getAriaValueText={ valuetext } min={ 2 } max={ 600 } id={ constants.filterValuesIds.FASHION_PRICE }/>
                </div>
            </div>
            <div className="row">
                <div className='col'>
                    <label style={{ paddingRight: '10px' }}>
                        Min<br/>
                        <input type="number" id={ constants.filterValuesIds.FASHION_MIN_PRICE } min={ 2 } max={ 600 } onChange={ priceRangeChangeFromInput }></input>
                    </label>
                    <label>
                        Max<br/>
                        <input type="number" id={ constants.filterValuesIds.FASHION_MAX_PRICE } min={ 2 } max={ 600 } onChange={ priceRangeChangeFromInput }></input>
                    </label>
                </div>
                <div className="col">
                    <Switch color="primary" slotProps={{ input: { 'aria-label': 'dark mode' } }} startDecorator={ <StardollarIcon /> }
                        endDecorator={ <StarcoinIcon /> } checked={ stardollars } onChange={(event) => setCurrency(event.target.checked)}
                        id={ constants.filterValuesIds.FASHION_CURRENCY_TYPE } />
                </div>
            </div>
        </>
    );
}

export default PriceSelector;
