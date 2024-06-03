import Slider from '@mui/material/Slider';
import Switch from '@mui/joy/Switch';

import { useState } from 'react';
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

    return(
        <>
            <div className="row">
                <div className='col'>
                    <Slider getAriaLabel={() => 'Starcoins'} value={ value } onChange={ handleChange } valueLabelDisplay="auto"
                        getAriaValueText={ valuetext } min={ 2 } max={ 600 } id={ constants.filterValuesIds.FASHION_PRICE }/>
                </div>
            </div>
            <div className="row">
                <div className='col'>
                    <label style={{ paddingRight: '10px' }}>
                        Min<br/>
                        <input type="number" id={ constants.filterValuesIds.FASHION_MIN_PRICE } min={ 2 } max={ 600 }></input>
                    </label>
                    <label>
                        Max<br/>
                        <input type="number" id={ constants.filterValuesIds.FASHION_MAX_PRICE } min={ 2 } max={ 600 }></input>
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
