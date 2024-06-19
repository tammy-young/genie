import constants from '../constants';
import './../App.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';


const getCurrencyIcon = ({ item }) => {
    return(
        item.currencyType === 1? <StardollarIcon /> : <StarcoinIcon />
    );
}

function copy(copyValue) {
    navigator.clipboard.writeText(copyValue);
}

const getBrandName = ({ item }) => {
    let brandId = item.brand;
    let allBrandsDiv = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
    let brands = JSON.parse(allBrandsDiv.innerHTML);
    return brands[brandId];
}

const ItemCard = ({ item, fashionBrands }) => {
    return (
        <div className="card item-card" style={{ width: '100%', padding: '10px', margin: '10px' }}>
            <div style={{ alignContent: 'center', paddingTop: '50px' }}>
                <img src={ item.itemImage } alt="No Image Found" style={{ width: '50%' }} />
            </div>
            <div style={{ padding: '10px' }}>
                <h6><b>{ item.name }</b></h6>
                <p style={{ marginTop: '-5px' }}>{ getBrandName({ item, fashionBrands }) }</p>
                <div style={{ textAlign: "left" }}>
                    <table>
                        <tr>
                            <th style={{ paddingRight: '50px', fontWeight:'normal' }}>
                                Selling for
                            </th>
                            <th style={{ fontWeight:'normal' }}>
                                { item.sellPrice }
                                { getCurrencyIcon({ item }) }
                            </th>
                        </tr>
                        <tr>
                            <th style={{ fontWeight:'normal' }}>
                                Original Price
                            </th>
                            <th style={{ fontWeight:'normal' }}>
                                { item.originalPrice }
                                { getCurrencyIcon({ item }) }
                            </th>
                        </tr>
                        <tr>
                            <th style={{ fontWeight: 'normal' }}>
                                Seller
                            </th>
                            <th style={{ fontWeight: 'normal' }}>
                                { item.sellerUsername }
                                <IconButton size="small" onClick={() => copy(item.sellerUsername) } style={{ display: "inline-block" }}>
                                    <ContentCopyIcon style={{ width: '17px', marginTop: '-5px' }}/>
                                </IconButton>
                            </th>
                        </tr>
                    </table>
                </div>
                
            </div>
        </div>
    )
}

export default ItemCard;
