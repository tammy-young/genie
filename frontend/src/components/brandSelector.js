import React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';

import constants from './../constants.js';
import './../App.css';


const BRAND_NAME_TEXT = "Brand Name";

const BrandSelector = ({ fashionBrands, loading }) => {
	return(
		<>
			{loading ?
				(<FormControl id="free-solo-2-demo">
					<FormLabel>{ BRAND_NAME_TEXT }</FormLabel>
					<Autocomplete
						placeholder="Start typing..." type="search" freeSolo disableClearable options={ [] }
						id={ constants.filterValuesIds.FASHION_BRAND } />
				</FormControl>) :
				(<FormControl id="free-solo-2-demo">
					<FormLabel>{ BRAND_NAME_TEXT }</FormLabel>
					<Autocomplete
						placeholder="Start typing..." type="search" freeSolo disableClearable options={ fashionBrands }
						id={ constants.filterValuesIds.FASHION_BRAND } />
				</FormControl>)
			}
		</>
	);
}

export default BrandSelector;
