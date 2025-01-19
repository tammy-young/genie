import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

import constants from "./../constants.js";
import './../App.css';


const NameSelector = () => {
    return(
        <>
            <FormControl className="pb-3">
                <FormLabel>Keyword</FormLabel>
                <Input className='spans' data-id={ constants.filterValuesIds.FASHION_ITEM_NAME }
                    placeholder='Name contains...'/>
                <FormHelperText>Hint: You can use this field to search for Stardesigners</FormHelperText>
            </FormControl>
            
        </>
    )
}

export default NameSelector;
