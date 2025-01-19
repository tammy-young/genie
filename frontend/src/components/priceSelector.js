import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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
    const [selectedBtn, setSelectedBtn] = useState(0);

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

    return (
        <>
            <div className={`flex flex-col row px-2 ${selectedBtn === 0 ? "!hidden" : ""}`}>
                <div className='row'>
                    <div className='col'>
                        Price Range
                    </div>
                </div>
                <div className='col'>
                    <ThemeProvider theme={theme}>
                        <Slider getAriaLabel={() => 'Starcoins'} value={value} onChange={handleChange} valueLabelDisplay="auto" color="primary"
                            getAriaValueText={valuetext} min={defaultMin} max={defaultMax} id={constants.filterValuesIds.FASHION_PRICE} />
                    </ThemeProvider>
                </div>
            </div>

            <div className="flex flex-row justify-between">
                <div className={`flex sm:flex-col ${selectedBtn === 0 ? "hidden" : ""}`}>
                    <label style={{ paddingRight: '10px' }}>
                        Min<br />
                        <input type="number" id={constants.filterValuesIds.FASHION_MIN_PRICE} min={defaultMin} max={defaultMax}
                            onChange={priceRangeChangeFromInput} defaultValue={defaultMin} className='my-input' />
                    </label>
                    <label>
                        Max<br />
                        <input type="number" id={constants.filterValuesIds.FASHION_MAX_PRICE} min={defaultMin} max={defaultMax}
                            onChange={priceRangeChangeFromInput} defaultValue={defaultMax} className='my-input' />
                    </label>
                </div>
                <div className="">
                    Currency Type
                    <div>
                        <ThemeProvider theme={theme}>
                            <ButtonGroup variant="outlined" aria-label="Currency Type Select">
                                <Button
                                    className={selectedBtn === 0 ? constants.filterValuesIds.SELECTED_CURRENCY : ""} id="0"
                                    color={selectedBtn === 0 ? "primary" : "secondary"} style={{ color: constants.colors.LIGHT_GREY, fontWeight: "normal" }}
                                    variant={selectedBtn === 0 ? "contained" : "outlined"} onClick={() => setSelectedBtn(0)}>
                                    N/A
                                </Button>
                                <Button
                                    className={selectedBtn === 1 ? constants.filterValuesIds.SELECTED_CURRENCY : ""} id="1"
                                    color={selectedBtn === 1 ? "primary" : "secondary"}
                                    variant={selectedBtn === 1 ? "contained" : "outlined"} onClick={() => setSelectedBtn(1)}>
                                    <StardollarIcon />
                                </Button>
                                <Button
                                    className={selectedBtn === 2 ? constants.filterValuesIds.SELECTED_CURRENCY : ""} id="2"
                                    color={selectedBtn === 2 ? "primary" : "secondary"}
                                    variant={selectedBtn === 2 ? "contained" : "outlined"} onClick={() => setSelectedBtn(2)}>
                                    <StarcoinIcon />
                                </Button>
                            </ButtonGroup>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PriceSelector;
