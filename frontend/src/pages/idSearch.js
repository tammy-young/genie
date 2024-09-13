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

const IdSearch = () => {

    const [searchedBrands, setSearchedBrands] = useState([]);
    const [searchingFor, setSearchingFor] = useState("");
    const [brandsToId, setBrandsToId] = useState({});

    const updateSearchingBrand = (brand) => {
        setSearchingFor(brand.target.value);
    }

    const getBrands = async () => {
		try {
			const response = await axios.get(constants.backend.API + constants.backend.GET_BRANDS);
            let brandsIdToName = response.data.brandsIdToName;
            let brandsNameToId = response.data.brandsNameToId;
            let brandsIdToNameHidden = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
            let brandsNameToIdHidden = document.getElementById(constants.divIds.BRANDS_NAME_TO_ID);
            if (brandsIdToNameHidden !== null && brandsNameToIdHidden !== null) {
                brandsIdToNameHidden.innerHTML = JSON.stringify(brandsIdToName);
                brandsNameToIdHidden.innerHTML = JSON.stringify(brandsNameToId);
                setSearchedBrands(reset());
                setBrandsToId(brandsNameToId);
            }
		} catch (error) {
			console.error('Error fetching brands:', error);
		}
	};

    const reset = () => {
        let allBrandsDiv = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
        const allBrands = JSON.parse(allBrandsDiv.innerHTML);
        return Object.values(allBrands).sort((a, b) => a.localeCompare(b));
    }

    useEffect(() => {
		getBrands();
        // eslint-disable-next-line
	}, []);

    return(
        <div className='page'>
            <div className="row">
                <div className='col filter-col' style={{ minWidth: '300px', paddingTop: '20px' }}>
                    <FormControl>
                        <FormLabel>Brand Name</FormLabel>
                        <Input className='spans' data-id={ constants.brandIdSearchPage.BRAND_ID_SEARCH_INPUT }
                         onChange={ updateSearchingBrand } placeholder='Start typing...' />
                         <br>
                         </br>
                    </FormControl>
                </div>
                <div className="col scrollable" style={{ maxWidth: '100%', minWidth: '300px', maxHeight: '84vh' }}>
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
                                                <div className='row'>
                                                    <div className='col'>
                                                        { brand }
                                                    </div>
                                                    <div className='ralign col' id={`brand-logo-${brandsToId[brand]}`}>
                                                        <img loading="lazy" height="25" srcSet={`https://wsrv.nl/?url=cdn.stardoll.com/cms/i/makeover/common/icons/brandLogos/${brandsToId[brand]}.png`}
                                                            src={`https://wsrv.nl/?url=cdn.stardoll.com/cms/i/makeover/common/icons/brandLogos/${brandsToId[brand]}.png`} alt=""
                                                            onError={() => document.getElementById(`brand-logo-${brandsToId[brand]}`).style.display = 'none'}
                                                            onLoad={() => document.getElementById(`brand-logo-${brandsToId[brand]}`).style.display = 'block'} />
                                                    </div>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                { brandsToId[brand] }
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
