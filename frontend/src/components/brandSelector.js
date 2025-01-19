import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/joy/Input';
import useAutocomplete from '@mui/material/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import constants from './../constants.js';
import './../App.css';


const BRAND_NAME_TEXT = "Brand Name";


function Tag({ label, onDelete, ...other }) {
	return (
		<div
			className="flex items-center p-1 m-1 bg-gray-100 dark:bg-[#1f2023] border rounded px-2 overflow-hidden"
			{...other}
		>
			<span className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>
			<CloseIcon
				onClick={onDelete}
				className="ml-2 !text-base cursor-pointer hover:text-red-500"
			/>
		</div>
	);
}

Tag.propTypes = {
	label: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export function BrandSelector({ brandsToId }) {

	const {
		getInputProps,
		getTagProps,
		getListboxProps,
		getOptionProps,
		groupedOptions = [],
		value = [],
	} = useAutocomplete({
		id: 'customized-hook-demo',
		multiple: true,
		options: brandsToId,
		getOptionLabel: (option) => option.name,
	});

	return (
		<div>
			<FormControl>
				<FormLabel>{BRAND_NAME_TEXT}</FormLabel>
				<Autocomplete
					id={constants.filterValuesIds.FASHION_BRAND}
					sx={{ width: 300 }}
					options={!brandsToId ? [{ name: "Loading...", brandId: 0 }] : brandsToId}
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

			<FormControl>
				<div className='py-2'>
					<FormLabel>Exclude Brands</FormLabel>
					<div>

						<Input {...getInputProps()}
							className="w-full border rounded dark:bg-[#1f2023]"
							placeholder='Start typing...'></Input>
					</div>
				</div>

				{groupedOptions.length > 0 && (
					<ul
						{...getListboxProps()}
						className="w-full mt-[4.5rem] bg-white rounded max-h-48 overflow-auto z-10 absolute border"
					>
						{groupedOptions.map((option, index) => {
							const { key, ...optionProps } = getOptionProps({ option, index });
							return (
								<li
									key={key}
									{...optionProps}
									className="px-3 py-2 flex items-center cursor-pointer hover:bg-blue-50 dark:hover:bg-neutral-600 dark:bg-[#1f2023]"
								>
									<span className="flex-grow">{option.name}</span>
									<CheckIcon fontSize="small" />
								</li>
							);
						})}
					</ul>
				)}

				<div className='flex flex-wrap'>
					{value.map((option, index) => {
						const { key, ...tagProps } = getTagProps({ index });
						return <Tag key={key} {...tagProps} label={option.name} />;
					})}
				</div>
			</FormControl>
		</div>

	);
}

export default BrandSelector;
