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

const getSeller = (item, index) => {
	fetch(constants.backend.API + constants.backend.GET_SELLER + "?sellerId=" + item.sellerId)
	.then(res => res.json())
	.then(data => {
		let username = data.sellerUser;
		let itemCardDiv = document.querySelector('div.item-card[data-div-id="' + index + '"]');
        let usernameTextBox = itemCardDiv.querySelector("#" + constants.divIds.SELLER_USERNAME_DIV_ID);
		usernameTextBox.innerHTML = username;
        let copyUserIcon = itemCardDiv.querySelector('#' + constants.divIds.COPY_ICON);
        copyUserIcon.style.visibility = "visible";
        copyUserIcon.onclick = function() {copy(username)};
	});
}

const ItemCard = ({ item, index }) => {
    return (
        <div className="card item-card" style={{ width: '100%', padding: '10px', margin: '10px', border: "1px solid rgba(0, 0, 0, 0.1)" }} data-div-id={ index }>
            <div style={{ alignContent: 'center', paddingTop: '50px' }}>
                <img src={ item.itemImage } alt="" style={{ width: '50%' }} />
            </div>
            <div style={{ padding: '10px' }}>
                <h6><b>{ item.name }</b></h6>
                <p style={{ marginTop: '-5px' }}>{ getBrandName({ item }) }</p>
                <div style={{ textAlign: "left" }}>
                    <div className='row'>
                        <div className='col'>
                            Sell
                        </div>
                        <div className='col ralign'>
                            { item.sellPrice }
                            { getCurrencyIcon({ item }) }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            Original
                        </div>
                        <div className='col ralign'>
                            { item.originalPrice }
                            { getCurrencyIcon({ item }) }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            Seller
                        </div>
                        <div className='col ralign' id={ constants.divIds.SELLER_USERNAME_DIV_ID } style={{ paddingRight: '5px' }}>
                            { getSeller(item, index) }
                        </div>
                        <div className='col ralign' style={{ maxWidth: '17px' }}>
                            <IconButton size="small" style={{ visibility: "hidden" }} id={ constants.divIds.COPY_ICON }>
                                <ContentCopyIcon style={{ width: '17px', marginTop: '-5px', marginLeft: '-25px' }}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;
