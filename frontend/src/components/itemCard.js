import constants from '../constants';
import { useEffect, useState } from 'react';
import './../App.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';
import ItemImage from './images/itemImagePlaceholder';
import Button from '@mui/joy/Button';


const getCurrencyIcon = ({ item }) => {
  return (
    item.currencyType === 1 ? <StardollarIcon /> : <StarcoinIcon />
  );
}

const ItemCard = ({ item, index }) => {
  const [sellerUsername, setSellerUsername] = useState("");
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    fetch(constants.backend.API + constants.backend.GET_SELLER + "?sellerId=" + item.sellerId)
      .then(res => res.json())
      .then(data => {
        let username = data.sellerUser;
        setSellerUsername(username);
      });
    getBrandName({ item });
  }, []);

  function copy(username) {
    if (username) {
      navigator.clipboard.writeText(sellerUsername);
    } else {
      navigator.clipboard.writeText(item.sellerId);
    }
  }

  const getBrandName = ({ item }) => {
    let brandId = item.brand;
    let allBrandsDiv = document.getElementById(constants.divIds.BRANDS_ID_TO_NAME);
    let brands = JSON.parse(allBrandsDiv.innerHTML);
    setBrandName(brands[brandId] ? brands[brandId].replace(/&amp;/g, "&") : "");
  }

  return (
    <div className="card item-card dark:!bg-neutral-800 !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[19%] w-3/4 light:border p-4" data-div-id={index}>
      <div className='flex flex-col relative'>
        <ItemImage itemId={item.itemId} />
        <h6 className='mb-0 font-bold text-lg leading-tight'>{item.name}</h6>
        <p className='mb-0'>{brandName}</p>
      </div>
      <div>
        <div className='flex flex-row space-x-4'>
          <div className='flex flex-row items-center'>
            <p className='mb-0'>{item.sellPrice}</p>
            {getCurrencyIcon({ item })}
          </div>
          <div className='flex flex-row items-center line-through decoration-neutral-400'>
            <p className='mb-0 text-neutral-500 dark:text-neutral-400'>{item.originalPrice}</p>
            {getCurrencyIcon({ item })}
          </div>
        </div>
        <div className='flex flex-row items-center'>
          <div>Sold by</div>
          {
            sellerUsername ? (
              <div className='text-overflow-ellipses max-w-20' id={constants.divIds.SELLER_USERNAME_DIV_ID}>
                &nbsp;{sellerUsername}
              </div>
            ) : null
          }
          <div className={`flex flex-row items-center pl-1`}>
            {
              sellerUsername ? (
                <IconButton className={`!p-0 pr-1`} onClick={() => copy(true)} aria-label="Copy Username">
                  <ContentCopyIcon style={{ width: '17px' }} className='text-neutral-400 dark:text-neutral-300' />
                </IconButton>
              ) : null
            }
            <Button className='!rounded-full px-2 !text-xs !bg-primary flex-flex-row items-center space-x-[1px]' onClick={() => copy(false)} sx={{ height: '3px' }}>
              <p className='mb-0'>ID</p>
              <ContentCopyIcon style={{ width: '14px' }} className='text-white dark:text-neutral-300' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;
