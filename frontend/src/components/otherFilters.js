import React from 'react';
import Checkbox from '@mui/joy/Checkbox';

import constants from './../constants.js';
import './../App.css';


const OtherFilters = () => {
	return(
		<>
			<Checkbox variant="outlined" color="neutral" label="Show Stardesign" id={ constants.filterValuesIds.SHOW_STARDESIGN } />
		</>
	);
}

export default OtherFilters;
