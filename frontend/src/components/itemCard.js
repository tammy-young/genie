import constants from '../constants';
import './../App.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';
import ItemImage from './images/itemImagePlaceholder';


const getCurrencyIcon = ({ item }) => {
  return (
    item.currencyType === 1 ? <StardollarIcon /> : <StarcoinIcon />
  );
}

function copy(copyValue) {
  navigator.clipboard.writeText(copyValue);
}

const getBrandName = ({ item }) => {
  let brandId = item.brand;
  let allBrandsDiv = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
  let brands = JSON.parse(allBrandsDiv.innerHTML);
  return brands[brandId] ? brands[brandId].replace(/&amp;/g, "&") : "";
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
      copyUserIcon.onclick = function () { copy(username) };
    });
}

const ItemCard = ({ item, index }) => {
  return (
    <div className="card item-card dark:!bg-neutral-800 !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[23%] w-3/4" style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} data-div-id={index}>
      <div className='p-4'>
        <ItemImage itemId={item.itemId} />
        <div className='flex flex-col text-center'>
          <h6><b>{item.name}</b></h6>
          <p style={{ marginTop: '-5px' }}>{getBrandName({ item })}</p>
        </div>
        <div style={{ textAlign: "left" }}>
          <div className='row'>
            <div className='col'>
              Sell
            </div>
            <div className='col ralign flex w-full flex-row justify-end text-center items-center'>
              <p className='mb-0'>{item.sellPrice}</p>
              <div className='-mb-[0.05rem]'>
                {getCurrencyIcon({ item })}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              Original
            </div>
            <div className='col ralign flex w-full flex-row justify-end justify-end text-center items-center'>
              <p className='mb-0'>{item.originalPrice}</p>
              <div className='-mb-[0.05rem]'>
                {getCurrencyIcon({ item })}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              Seller
            </div>
            <div className='col ralign text-overflow-ellipses' id={constants.divIds.SELLER_USERNAME_DIV_ID} style={{ paddingRight: '5px' }}>
              {getSeller(item, index)}
            </div>
            <div className='col ralign' style={{ maxWidth: '17px' }}>
              <IconButton size="small" style={{ visibility: "hidden" }} id={constants.divIds.COPY_ICON}>
                <ContentCopyIcon style={{ width: '17px', marginTop: '-5px', marginLeft: '-25px' }} className='text-neutral-400 dark:text-neutral-300' />
              </IconButton>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              Seller ID
            </div>
            <div className='col ralign text-overflow-ellipses' id={constants.divIds.SELLER_USERNAME_ID_DIV_ID} style={{ paddingRight: '5px' }}>
              {item.sellerId}
            </div>
            <div className='col ralign' style={{ maxWidth: '17px' }}>
              <IconButton size="small" id={constants.divIds.COPY_ID_ICON} onClick={() => copy(item.sellerId)}>
                <ContentCopyIcon style={{ width: '17px', marginTop: '-5px', marginLeft: '-25px' }} className='text-neutral-400 dark:text-neutral-300' />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;
