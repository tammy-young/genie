import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import constants from '../../constants.js';

const BRAND_NAME_TEXT = "Brand Name";

export function BrandSelector({ brandsToId, setSelectedBrand, selectedBrand }) {
	return (
		<FormControl>
			<FormLabel className="dark:!text-white">
				{BRAND_NAME_TEXT}
			</FormLabel>
			<Autocomplete
				id={constants.filterValuesIds.FASHION_BRAND}
				options={!brandsToId ? [{ name: "Loading...", brandId: 0 }] : brandsToId}
				placeholder='Start typing...'
				className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
				autoHighlight
				getOptionLabel={(option) => option.name || ''}
				value={selectedBrand}
				slotProps={{
					listbox: {
						sx: (theme) => ({
							zIndex: theme.vars.zIndex.modal,
						}),
						className: 'dark:!bg-neutral-800'
					}
				}}
				onChange={(event, value) => {
					setSelectedBrand(value);
				}}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props;
					return (
						<Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', paddingLeft: '10px', paddingRight: '10px', minHeight: '35px', maxHeight: '100px' }} {...optionProps}
							className='-mt-2 mb-2 dark:!bg-neutral-800 dark:text-white dark:hover:!bg-neutral-600 dark:aria-selected:bg-neutral-600 aria-selected:font-bold'>
							<div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
								{option.name}
							</div>
						</Box>
					);
				}}
				renderInput={(params) => (
					<TextField {...params} label="Start typing..."
						slotProps={{
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
