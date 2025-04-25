import Input from '@mui/joy/Input';
import useAutocomplete from '@mui/material/useAutocomplete';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import constants from '../../constants.js';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';


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

const ExcludeBrandSelector = ({ brandsToId, setExcludedBrands, excludedBrands }) => {
  const {
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions = [],
    value = excludedBrands,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: brandsToId,
    onChange: (event, newValue) => {
      setExcludedBrands(newValue);
    },
    getOptionLabel: (option) => option.name,
    value: excludedBrands,
  });

  return (
    <FormControl>
      <div>
        <FormLabel>Exclude Brands</FormLabel>
        <Input {...getInputProps()}
          className="w-full border rounded dark:bg-[#1f2023] w-full"
          placeholder='Start typing...'></Input>
      </div>

      <div className='relative overflow-visible'>
        {groupedOptions.length > 0 && (
          <Listbox
            {...getListboxProps()}
            className="w-full !z-[9999] bg-white rounded overflow-auto z-10 absolute border dark:!text-white max-h-96"
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

      <div className='flex flex-wrap 2xl:max-w-[48%] w-full flex-row' id={constants.divIds.EXCLUDED_BRANDS_SECTION}>
        {value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return <Tag key={key} {...tagProps} label={option.name} />;
        })}
      </div>
    </FormControl>
  )
}

export default ExcludeBrandSelector;
