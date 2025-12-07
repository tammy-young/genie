import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Box from '@mui/material/Box';
import { Input } from '@mui/joy';
import { useAutocomplete } from '@mui/material';
import { Listbox } from './excludeBrandFilter.js';
import CheckIcon from '@mui/icons-material/Check';

export function BrandSelector({ brandsToId, setSelectedBrand, selectedBrand }) {
	const {
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions = [],
		value = selectedBrand,
	} = useAutocomplete({
		id: 'brand-hook',
		options: brandsToId,
		onChange: (event, newValue) => {
			setSelectedBrand(newValue);
		},
		getOptionLabel: (option) => option?.name || '',
		value: selectedBrand,
		filterOptions: (options, state) => {
			const filtered = options.filter(option =>
				option.name.toLowerCase().includes(state.inputValue.toLowerCase())
			);
			return filtered.slice(0, 5);
		},
	});

	return (
		<FormControl>
			<div>
				<FormLabel className="dark:!text-white">
					Brands
				</FormLabel>
				<Input
					{...getInputProps()}
					className="w-full border rounded w-full dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400"
					placeholder='Start typing...'
					sx={{
						inputProps: {
							id: "brandFilter"
						}
					}}
				/>
			</div>

			<div className='relative overflow-visible !z-[9999]'>
				{groupedOptions.length > 0 && (
					<Listbox
						{...getListboxProps()}
						className="w-full !z-[9999] bg-white rounded overflow-auto z-10 absolute border dark:!text-white max-h-96"
					>
						{groupedOptions.map((option, index) => {
							const { key, ...optionProps } = getOptionProps({ option, index });
							return (
								<Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', '& > *': { flexGrow: 1 }, paddingLeft: '10px', paddingRight: '10px', minHeight: '35px' }} {...optionProps}
									className='flex items-center cursor-pointer hover:bg-blue-50 dark:text-white dark:hover:!bg-neutral-600 dark:bg-neutral-800'>
									<div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
										<div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }} className='!text-base'>
											{option.name}
										</div>
										<CheckIcon />
									</div>
								</Box>
							);
						})}
					</Listbox>
				)}
			</div>
		</FormControl>
	);
}

export default BrandSelector;
