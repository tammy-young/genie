import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import NameSelector from './nameSelector.js';
import BrandSelector from './brandSelector.js';
import PriceSelector from './priceSelector.js';
import OtherFilters from './otherFilters.js';

import "./../App.css";
import constants from '../constants.js';
import axios from 'axios';

/**
 * filterType
 * 0 - brand filter
 * 1 - price filter
 * 2 - name filter
 * 3 - other filters
 */
const filters = [{
    "name": "Brand",
    "filterType": 0,
    "divName": constants.divIds.FASHION_BRAND_DIV
}, {
    "name": "Price",
    "filterType": 1,
    "divName": constants.divIds.FASHION_PRICE_DIV
}, {
    "name": "Item Name",
    "filterType": 2,
    "divName": constants.divIds.FASHION_NAME_DIV
}, {
    "name": "Other",
    "filterType": 3,
    "divName": constants.divIds.OTHER_FILTERS_DIV
}];

const getFilter = (row, brands) => {

    let filterType = row.filterType;
    if (filterType === 0) {
        return(<BrandSelector brandsToId={ brands } />);
    } else if (filterType === 1) {
        return(<PriceSelector />);
    } else if (filterType === 2) {
        return(<NameSelector />);
    } else if (filterType === 3) {
        return (<OtherFilters />);
    }
}

const clearFilters = () => {
    const svgs = document.querySelectorAll('table svg');
    svgs.forEach(svg => {
        if (svg.dataset.testid === "KeyboardArrowUpIcon") {
            const button = svg.closest('button');
            if (button) {
                button.click();
            }
        }
    });
}

const FilterRow = ({ row, brands }) => {
    const [open, setOpen] = useState(false);
  
    return(
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    <h6><b>{ row.name }</b></h6>
                </TableCell>
                <TableCell style={{ textAlign: 'right' }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={ open } timeout="auto" unmountOnExit id={ row.divName }>
                        <Box sx={{ margin: 1 }}>
                            { getFilter(row, brands) }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const FilterTable = () => {

    const [brandsToId, setBrandsToId] = useState([]);
    
    const getBrands = async () => {
		try {
			const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);

            let brandsIdToName = response.data.brandsIdToName;
            let brandsNameToId = response.data.brandsNameToId;

            let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
            let brandsNameToIdHidden = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
            brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);
            brandsNameToIdHidden.innerHTML = JSON.stringify(brandsNameToId);

			let formattedBrandsList = [];
			for (const [key, value] of Object.entries(brandsNameToId)) {
				formattedBrandsList.push({'name': key, 'brandId': value});
			}
			setBrandsToId(formattedBrandsList);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

    useEffect(() => {
		getBrands();
	}, []);

    return(
        <TableContainer component={Paper} style={{ minWidth: '350px', maxWidth: '350px' }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Filters</b></TableCell>
                        <TableCell className="genie-primary-text" style={{ textAlign: 'right', cursor: 'pointer' }} onClick={ clearFilters }>
                            Clear All
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { filters
                      .map((row, index) => (
                        <FilterRow key={index} row={ row } brands={ brandsToId } />
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FilterTable;
