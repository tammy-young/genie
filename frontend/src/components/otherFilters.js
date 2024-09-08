import React from 'react';
import Checkbox from '@mui/joy/Checkbox';

import constants from './../constants.js';
import './../App.css';


const OtherFilters = () => {
	return(
		<>
			<Checkbox variant="outlined" color="neutral" label="Show Stardesign, Special Offer, and Buy & Get"
			  id={ constants.filterValuesIds.SHOW_STARDESIGN } defaultChecked="true" />
		</>
	);
}

export default OtherFilters;
