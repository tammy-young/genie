import React, { useState, useEffect } from 'react';
import axios from 'axios';

const brandSelectTitle = "Brand Name"
const brandNameFilterId = "brandNameFilter";
const brandNameErrorId = "brandNameError";

const BrandSelector = () => {

	// for fetching the brands
	const [fashionBrands, setFashionBrands] = useState([]);
	const [loading, setLoading] = useState(true);

	const onChangeBrand = (event) => {
		setSelectedBrand(event.target.value)
	}

    const getBrands = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/search/', { 
				params: {
					operation: 'getBrands'
				}
			});
            setFashionBrands(response.data.brands);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getBrands();
	}, []);

	// for search bar
	const [selectedBrandId, setSelectedBrandId] = useState('');
	const [selectedBrand, setSelectedBrand] = useState('');

	const onSearchBrand = (brand) => {
		setSelectedBrand(brand.name);
		setSelectedBrandId(brand.id);
		console.log("searching for " + brand);
	}
	
	return(
		<>
			{loading ?
				(<label className='spans'>
					{ brandSelectTitle }
					<div className='search-container'>
						<div className='search-inner'>
							<input type="text" value={ selectedBrand } className='spans' onChange={ onChangeBrand }></input>
						</div>
						<div className='dropdown'>
						</div>
					</div>
				</label>) :
				(<label className='spans'>
					{ brandSelectTitle }
					<div className='search-container'>
						<div className='search-inner'>
							<input type="text" value={ selectedBrand } className='spans' onChange={ onChangeBrand } placeholder='Start typing...' id={ brandNameFilterId }></input>
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
									<div className='dropdown-row' onClick={() => onSearchBrand(brand)} key={brand.name}>
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
