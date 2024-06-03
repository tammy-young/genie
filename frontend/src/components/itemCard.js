import constants from '../constants';
import './../App.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

const sellerNameDiv = "sellerNameDiv"


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

function copy(copyValue) {
    navigator.clipboard.writeText(copyValue);
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
                        Seller: 
                        <div id={ sellerNameDiv }>
                            { item.sellerUsername } 
                        </div>
                        <IconButton size="small" onClick={() => copy(item.sellerUsername) }>
                            <ContentCopyIcon />
                        </IconButton>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ItemCard;
