import React, { useState, useEffect } from 'react';
import axios from 'axios';
import constants from './../constants.js';
import './../App.css';

const brandSelectTitle = "Brand Name"
const brandNameErrorId = "brandNameError";

const BrandSelector = ({ fashionBrands, loading }) => {

	// for search bar
	const [selectedBrandId, setSelectedBrandId] = useState('');
	const [selectedBrand, setSelectedBrand] = useState('');

	const onChangeBrand = (event) => {
		setSelectedBrand(event.target.value)
		setSelectedBrandId(event.target.dataset.brandId)
	}

	const onSearchBrand = (brand) => {
		setSelectedBrand(brand.name);
		setSelectedBrandId(brand.id)
		console.log("searching for " + brand);
	}
	
	return(
		<>
			{loading ?
				(<label className='spans'>
					{ brandSelectTitle }
					<div className='search-container'>
						<div className='search-inner'>
							<input type="text" value={ selectedBrand } className='spans' onChange={ onChangeBrand } data-brand-id={ selectedBrandId }></input>
						</div>
						<div className='dropdown'>
						</div>
					</div>
				</label>) :
				(<label className='spans'>
					{ brandSelectTitle }
					<div className='search-container'>
						<div className='search-inner'>
							<input type="text" value={ selectedBrand } className='spans' onChange={ onChangeBrand } placeholder='Start typing...'
								id={ constants.filterValuesIds.FASHION_BRAND } data-brand-id={ selectedBrandId }></input>
							<p id={ brandNameErrorId }></p>
						</div>
						<div className='dropdown'>
							{ fashionBrands
								.filter(brand => {
									const searchedBrand = selectedBrand.toLowerCase();
									const brandName = brand.name.toLowerCase();
									return searchedBrand && brandName.startsWith(searchedBrand) && brandName !== searchedBrand;
								})
								.map((brand) => (
									<div className='dropdown-row' onClick={() => onSearchBrand(brand)} key={ brand.name } value={ brand.id }>
										{ brand.name }
									</div>)
								)
								.slice(0, 5)
							}
						</div>
					</div>
				</label>
				)
			}
		</>
	);
}

export default BrandSelector;
