import React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import { ThemeProvider } from '@mui/material/styles';

import constants from './../constants.js';
import theme from '../themes.js';
import './../App.css';


const OtherFilters = () => {
	return(
		<>
            {/* <ThemeProvider theme={ theme }> */}
                <Checkbox variant="outlined" label="Show Stardesign" color="stardollPurple" id={ constants.filterValuesIds.SHOW_STARDESIGN } />
            {/* </ThemeProvider> */}
		</>
	);
}

export default OtherFilters;
