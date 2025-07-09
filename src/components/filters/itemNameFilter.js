import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import constants from "../../constants.js";


const NameSelector = ({ setItemName, itemName }) => {
  return (
    <FormControl className='w-full'>
      <FormLabel className="dark:!text-white">
        Keyword
        <Tooltip title="Hint: You can use this field to search for Stardesigners">
          <InfoOutlinedIcon className='cursor-pointer !w-4 !h-4 !text-primary' />
        </Tooltip>
      </FormLabel>
      <Input
        data-id={constants.filterValuesIds.FASHION_ITEM_NAME}
        placeholder='Name contains...'
        onChange={(e) => { setItemName(e.target.value) }} value={itemName}
        className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
      />
    </FormControl>
  )
}

export default NameSelector;
