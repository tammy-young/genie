import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import constants from '../constants';
import './../App.css';
import { useEffect, useState } from 'react';


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
        console.log("searching for " + brand);
    }

    useEffect(() => {
		setSearchedBrands(reset());
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
                <div className="col" style={{ overflowY: "scroll", maxWidth: '100%', maxHeight: '85vh' }}>
                    <div className="row">
                        <div className="col">
                            Name
                        </div>
                        <div className="col">
                            Id
                        </div>
                    </div>
                    { searchedBrands
                        .filter(brand => {
                            const searchedBrand = searchingFor.toLowerCase();
                            const brandName = brand.toLowerCase();
                            return (searchedBrand && brandName.includes(searchedBrand) && brandName !== searchedBrand) || searchedBrand === "";
                        })
                        .map((brand) => (
                            <div className='row id-search-row' onClick={() => updateSearchingBrand(brand)} key={brand}>
                                <div className="col">
                                    { brand }
                                </div>
                                <div className="col">
                                    { getIdFromBrandName(brand) }
                                </div>
                            </div>)
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default IdSearch;
