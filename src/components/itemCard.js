import constants from '../constants';
import { useEffect, useState } from 'react';
import '../App.css';
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

const ItemCard = ({ item, index, itemType, allBrands }) => {
  const [sellerUsername, setSellerUsername] = useState("");
  const [brandName, setBrandName] = useState("");
  let idButtonColour = "";

  if (itemType === 'fashion') {
    idButtonColour = "!bg-fashion";
  } else if (itemType === 'interior') {
    idButtonColour = "!bg-interior";
  } else if (itemType === 'jewelry') {
    idButtonColour = "!bg-jewelry";
  } else if (itemType === 'hair') {
    idButtonColour = "!bg-hair";
  }

  useEffect(() => {
    fetch(constants.backend.API + constants.backend.GET_SELLER + "?sellerId=" + item.sellerId)
      .then(res => res.json())
      .then(data => {
        let username = data.sellerUser;
        setSellerUsername(username);
      });
    // eslint-disable-next-line
  }, []);

  function copy(username) {
    if (username) {
      navigator.clipboard.writeText(sellerUsername);
    } else {
      navigator.clipboard.writeText(item.sellerId);
    }
  }

  useEffect(() => {
    if (Object.keys(allBrands).length !== 0) {
      setBrandName(allBrands[item.brand] ? allBrands[item.brand].replace(/&amp;/g, "&") : "");
    }
    // eslint-disable-next-line
  }, [allBrands]);

  return (
    <div className="card item-card dark:!bg-neutral-800 !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[19%] w-3/4 light:border p-4 flex flex-col" data-div-id={index}>
      <ItemImage itemId={itemType === "hair" ? item.customItemId : item.itemId} itemType={itemType} />
      <h6 className='mb-0 font-bold text-lg leading-tight'>{item.name}</h6>
      <p className='mb-1'>{brandName}</p>
      <div className='flex flex-row space-x-3'>
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
            <div className='text-overflow-ellipses max-w-28 sm:max-w-20 md:max-w-24' id={constants.divIds.SELLER_USERNAME_DIV_ID}>
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
          <Button className={`!rounded-full px-2 !text-xs flex-flex-row items-center space-x-[1px] ${idButtonColour} ${itemType === "hair"? '!text-neutral-500' : ''}`} onClick={() => copy(false)} sx={{ height: '3px' }}>
            <p className='mb-0'>ID</p>
            <ContentCopyIcon style={{ width: '14px' }} className={`${itemType === "hair"? 'text-neutral-500 dark:text-neutral-500' : 'text-white dark:text-neutral-300'}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;
