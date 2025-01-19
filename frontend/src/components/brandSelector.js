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
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

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

const Listbox = styled('ul')(
	() => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff; /* Default light mode background */
  color: #000; /* Default light mode text color */
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
  z-index: 1;

  /* Dark mode styles */
  @media (prefers-color-scheme: dark) {
    background-color: #141414 !important; /* Dark mode background */
    color: #e0e0e0 !important; /* Dark mode text color */

		& svg {
			color: transparent !important;
		}

    & li[aria-selected='true'] {
      background-color: #3b3b3b !important; /* Dark mode selected background */
      font-weight: 600;

      & svg {
        color: ${constants.colors.PRIMARY} !important;
      }
    }

    & li.${autocompleteClasses.focused} {
      background-color: #003b57 !important; /* Dark mode focused background */
      cursor: pointer;

      & svg {
        color: currentColor !important;
      }
    }

    & li:hover {
      background-color: #1a1a1a !important; /* Dark mode hover effect */
    }
  }
  }

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa; /* Light mode selected background */
    font-weight: 600;

    & svg {
      color: ${constants.colors.PRIMARY};
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: #e6f7ff; /* Light mode focused background */
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }

  /* Add hover effects */
  & li:hover {
    background-color: #f5f5f5; /* Light mode hover effect */
  }

  
`,
);


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
		onChange: (event, newValue) => setExcludedBrands(newValue),
		getOptionLabel: (option) => option.name,
	});

	function setExcludedBrands(newValue) {
		document.getElementById(constants.divIds.EXCLUDED_BRANDS_DIV).innerText = newValue.map((option) => option.brandId).join(",");
	}

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
							<Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', paddingLeft: '10px', paddingRight: '10px', minHeight: '35px', maxHeight: '100px' }} {...optionProps}
								className='-mt-2 mb-2 dark:bg-[#1f2023] dark:text-white dark:hover:!bg-neutral-600 dark:aria-selected:bg-neutral-600 aria-selected:font-bold'>
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

				<div className='relative overflow-visible'>
					{groupedOptions.length > 0 && (
						<Listbox
							{...getListboxProps()}
							className="w-full !-mt-2 !z-[9999] bg-white rounded overflow-auto z-10 absolute border max-h-36 dark:!text-white"
						>
							{groupedOptions.map((option, index) => {
								const { key, ...optionProps } = getOptionProps({ option, index });
								return (
									<Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', '& > *': { flexGrow: 1 }, paddingLeft: '10px', paddingRight: '10px', minHeight: '35px' }} {...optionProps}
										className='flex items-center cursor-pointer hover:bg-blue-50 dark:text-white dark:hover:!bg-neutral-600 dark:bg-[#1f2023]'>
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
