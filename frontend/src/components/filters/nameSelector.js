import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import constants from "../../constants.js";


const NameSelector = () => {
  return (
    <FormControl className="">
      <FormLabel>
        Keyword
        <Tooltip title="Hint: You can use this field to search for Stardesigners">
          <InfoOutlinedIcon className='cursor-pointer !w-4 !h-4 !text-primary' />
        </Tooltip>
      </FormLabel>
      <Input data-id={constants.filterValuesIds.FASHION_ITEM_NAME} placeholder='Name contains...' />
    </FormControl>
  )
}

export default NameSelector;
