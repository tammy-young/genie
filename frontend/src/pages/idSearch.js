import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import constants from '../constants';
import './../App.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: constants.colors.PRIMARY,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const reset = () => {
    let allBrandsDiv = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
    const allBrands = JSON.parse(allBrandsDiv.innerHTML);
    return Object.values(allBrands).sort((a, b) => a.localeCompare(b));
}

const getIdFromBrandName = (brandName) => {
    let allBrandsDiv = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
    const allBrands = JSON.parse(allBrandsDiv.innerHTML);
    return allBrands[brandName];
}

const IdSearch = () => {

    const [searchedBrands, setSearchedBrands] = useState([]);
    const [searchingFor, setSearchingFor] = useState("");

    const updateSearchingBrand = (brand) => {
        setSearchingFor(brand.target.value);
    }

    const getBrands = async () => {
		try {
			let apiUrl = process.env.API;
            let undefinedPart = "/undefined";
            if (apiUrl.includes(undefinedPart)) {
                apiUrl.replace(undefinedPart, "")
            }
			const response = await axios.get(apiUrl + constants.backend.GET_BRANDS);
            let brandsIdToName = response.data.brandsIdToName;
            let brandsNameToId = response.data.brandsNameToId;
            let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
            let brandsNameToIdHidden = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
            if (brandsIdToNameHidden !== null && brandsNameToIdHidden !== null) {
                brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);
                brandsNameToIdHidden.innerHTML = JSON.stringify(brandsNameToId);
                setSearchedBrands(reset());
            }
		} catch (error) {
			console.error('Error fetching brands:', error);
		}
	};

    useEffect(() => {
		getBrands();
	}, []);

    return(
        <div className='page' style={{ padding: '30px' }}>
            <div className="row">
                <div className='col filter-col'>
                    <FormControl>
                        <FormLabel>Brand Name</FormLabel>
                        <Input className='spans' data-id={ constants.brandIdSearchPage.BRAND_ID_SEARCH_INPUT }
                         onChange={ updateSearchingBrand } />
                    </FormControl>
                </div>
                <div className="col scrollable" style={{ maxWidth: '100%', maxHeight: '84vh' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        Name
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Id
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ maxHeight: '79vh' }}>
                                { searchedBrands
                                    .filter(brand => {
                                        const searchedBrand = searchingFor.toLowerCase();
                                        const brandName = brand.toLowerCase();
                                        return (searchedBrand && brandName.includes(searchedBrand)) || searchedBrand === "";
                                    })
                                    .map((brand) => (
                                        <StyledTableRow>
                                            <StyledTableCell>
                                                { brand }
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                { getIdFromBrandName(brand) }
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        )
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{ display: "none" }} id={ constants.divIds.BRANDS_NAME_TO_ID }></div>
            <div style={{ display: "none" }} id={ constants.divIds.BRANDS_ID_TO_NAME }></div>
        </div>
    );
}

export default IdSearch;
