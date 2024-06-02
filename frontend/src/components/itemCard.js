import constants from '../constants';
import './../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ImgFromBase64 = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt="" />

const getCurrencyIcon = ({ item }) => {
	if (item.currencyType === 1) {
		return(
			<img className="currency-icon" src={ process.env.PUBLIC_URL + "stardollar.png"} alt=""></img>
		)
	} else {
		return(
			<img className="currency-icon" src={ process.env.PUBLIC_URL + "starcoin.png"} alt=""></img>
		)
	}
}

const getBrandName = ({ item }) => {
    let brandId = item.brand;
    let idToBrandMap = {};
    let allBrandsDiv = document.getElementById(constants.divIds.ALL_BRANDS_DIV);
    let fashionBrands = JSON.parse(allBrandsDiv.innerHTML);
    fashionBrands.forEach(brand => {
        idToBrandMap[brand.id] = brand.name;
    });
    return idToBrandMap[brandId];
}

const ItemCard = ({ item, fashionBrands }) => {
    return (
        <div className="card item-card" style={{ width: '100%', padding: '10px', margin: '10px' }}>
            <ImgFromBase64 data={ item.itemImage } />
            <div style={{ padding: '10px' }}>
                <h6><b>{ item.name }</b></h6>
                <p>{ getBrandName({ item, fashionBrands }) }</p>
                <div style={{ textAlign: "left" }}>
                    <div style={{ display: "inline-block" }}>
                        Selling for: { item.sellPrice }
                        { getCurrencyIcon({ item }) }
                    </div>
                    <br />
                    <p style={{ display: "inline-block" }}>
                        Original: { item.originalPrice }
                        { getCurrencyIcon({ item }) }
                    </p>
                    <div>
                        Seller: { item.sellerUsername } 
                        <FontAwesomeIcon icon="fa-solid fa-copy" />
                        {/* <button>
                            
                        </button> */}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ItemCard;
