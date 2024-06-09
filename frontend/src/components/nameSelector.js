import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import constants from "./../constants.js";
import './../App.css';


const NameSelector = () => {
    return(
        <>
            <FormControl>
                <FormLabel>Keyword</FormLabel>
                <Input className='spans' data-id={ constants.filterValuesIds.FASHION_ITEM_NAME }
                    placeholder='Name contains...' />
            </FormControl>
            
        </>
    )
}

export default NameSelector;
