import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function ColourFilter({ coloursToId, setSelectedColour, selectedColour }) {
	return (
		<FormControl>
			<FormLabel>Colour</FormLabel>
			<Autocomplete
				options={!coloursToId ? [{ name: "Loading...", categoryId: 0 }] : coloursToId}
				placeholder='Start typing...'
				autoHighlight
				getOptionLabel={(option) => option.name || ''}
				value={selectedColour}
				slotProps={{
					listbox: {
						sx: (theme) => ({
							zIndex: theme.vars.zIndex.modal,
						}),
						className: 'dark:!bg-[#1f2023]'
					}
				}}
				onChange={(event, value) => {
					setSelectedColour(value);
				}}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props;
					return (
						<Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', paddingLeft: '10px', paddingRight: '10px', minHeight: '35px', maxHeight: '100px' }} {...optionProps}
							className='-mt-2 mb-2 dark:bg-[#1f2023] dark:text-white dark:hover:!bg-neutral-600 dark:aria-selected:bg-neutral-600 aria-selected:font-bold'>
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

export default ColourFilter;
