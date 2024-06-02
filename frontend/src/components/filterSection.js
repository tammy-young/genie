import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../App.css';
import constants from './../constants.js';

import BrandSelector from './brandSelector';
import PriceSelector from './priceSelector';
import NameSelector from './nameSelector';


const FilterSection = () => {

    // for fetching the brands
	const [fashionBrands, setFashionBrands] = useState([]);
	const [loading, setLoading] = useState(true);

    const getBrands = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/getBrands/');
            let brands = response.data.brands;
            setFashionBrands(brands);
            let allBrandsHidden = document.getElementById(constants.divIds.ALL_BRANDS_DIV);
            allBrandsHidden.innerHTML = JSON.stringify(brands);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

    useEffect(() => {
		getBrands();
	}, []);

    return(
        <table className='table'>
            <thead>
                <tr>
                    <th style={{ position: 'relative' }}>
                        <h3 style={{ position: 'absolute', top: 15, left: 15 }}>Brands</h3>
                    </th>
                    <th>
                        <div id={ constants.divIds.FASHION_BRAND_DIV_NAME } style={{ visibility: 'visible' }}>
                            <BrandSelector fashionBrands={ fashionBrands } loading={ loading } />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                        <h3>Price</h3>
                    </th>
                    <th>
                        <div id={ constants.divIds.FASION_PRICE_SELECT_DIV } style={{ visibility: 'visible' }}>
                            <PriceSelector />
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>
                        <h3>Item Name</h3>
                    </th>
                    <th>
                        <div id={ constants.divIds.FASHION_NAME_SELECT_DIV }>
                            <NameSelector />
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default FilterSection;
