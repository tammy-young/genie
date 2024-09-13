import { useState, useEffect } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import constants from './../constants.js';
import './../App.css';
import axios from 'axios';


const BRAND_NAME_TEXT = "Brand Name";

export function BrandSelector() {

	const [brandsToId, setBrandsToId] = useState([]);
    
    const getBrands = async () => {
		try {
			const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);

            let brandsIdToName = response.data.brandsIdToName;
            let brandsNameToId = response.data.brandsNameToId;

            let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
            let brandsNameToIdHidden = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
            brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);
            brandsNameToIdHidden.innerHTML = JSON.stringify(brandsNameToId);

			let formattedBrandsList = [];
			for (const [key, value] of Object.entries(brandsNameToId)) {
				formattedBrandsList.push({'name': key, 'brandId': value});
			}
			setBrandsToId(formattedBrandsList);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

    useEffect(() => {
		getBrands();
	}, []);

	return (
		<FormControl>
			<FormLabel>{ BRAND_NAME_TEXT }</FormLabel>
			<Autocomplete
				id={ constants.filterValuesIds.FASHION_BRAND }
				sx={{ width: 300 }}
				options={brandsToId}
				placeholder='Start typing...'
				autoHighlight
				getOptionLabel={(option) => option.name}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props;
					return (
						<Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', '& > *': { flexGrow: 1 }, paddingLeft: '10px', paddingRight: '10px', minHeight: '35px' }} {...optionProps}>
							<div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
								{option.name}
							</div>
							<div className='ralign' style={{ maxWidth: 'min-content', display: 'flex', alignItems: 'center' }} id={`brand-logo-${option.brandId}`}>
								<img loading="lazy" height="25" srcSet={`https://wsrv.nl/?url=cdn.stardoll.com/cms/i/makeover/common/icons/brandLogos/${option.brandId}.png`}
									src={`https://wsrv.nl/?url=cdn.stardoll.com/cms/i/makeover/common/icons/brandLogos/${option.brandId}.png`} alt=""
									onError={() => document.getElementById(`brand-logo-${option.brandId}`).style.display = 'none'}
									onLoad={() => document.getElementById(`brand-logo-${option.brandId}`).style.display = 'block'} />
							</div>
						</Box>
					);
				}}
				renderInput={(params) => (
					<TextField {...params} label="Start typing..." slotProps={{
						htmlInput: {
							...params.inputProps,
							autoComplete: 'new-password',
						},
					 }} />
				)}
			/>
		</FormControl>
	);
}

export default BrandSelector;
