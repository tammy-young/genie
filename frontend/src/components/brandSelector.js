import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import constants from './../constants.js';
import './../App.css';


const BRAND_NAME_TEXT = "Brand Name";

export function BrandSelector({ brandsToId }) {
	return (
		<FormControl>
			<FormLabel>{ BRAND_NAME_TEXT }</FormLabel>
			<Autocomplete
				id={ constants.filterValuesIds.FASHION_BRAND }
				sx={{ width: 300 }}
				options={!brandsToId ? [{name:"Loading...", brandId:0}] : brandsToId }
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
