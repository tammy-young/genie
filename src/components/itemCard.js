import constants from '../constants';
import { useEffect, useState } from 'react';
import '../App.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import StardollarIcon from './images/stardollar';
import StarcoinIcon from './images/starcoin';
import ItemImage from './images/itemImagePlaceholder';
import Button from '@mui/joy/Button';
import WishlistStar from './wishlistStar';


const getCurrencyIcon = ({ item }) => {
  return (
    item.currencyType === 1 ? <StardollarIcon /> : <StarcoinIcon />
  );
}

const ItemCard = ({ item, itemType, allBrands, userId = "", wishPage = false }) => {
  const [sellerUsername, setSellerUsername] = useState("");
  const [brandName, setBrandName] = useState("");
  const [wishlisted, setWishlisted] = useState(false);

  let idButtonColour = "";
  let hoverOutlineColour = "";
  let hoverTextColour = "";

  if (itemType === 'fashion') {
    idButtonColour = "!bg-fashion";
    hoverOutlineColour = "group-hover:border-fashion/30";
    hoverTextColour = "group-hover:text-fashion";
  } else if (itemType === 'interior') {
    idButtonColour = "!bg-interior";
    hoverOutlineColour = "group-hover:border-interior/30";
    hoverTextColour = "group-hover:text-interior";
  } else if (itemType === 'jewelry') {
    idButtonColour = "!bg-jewelry";
    hoverOutlineColour = "group-hover:border-primary/30";
    hoverTextColour = "group-hover:text-primary";
  } else if (itemType === 'hair') {
    idButtonColour = "!bg-hair";
    hoverOutlineColour = "group-hover:border-hair/30";
    hoverTextColour = "group-hover:text-hair-dark dark:group-hover:text-hair";
  } else {
    idButtonColour = "!bg-primary";
    hoverOutlineColour = "group-hover:border-primary/30";
    hoverTextColour = "group-hover:text-primary";
  }

  function getBrand() {
    fetch(constants.backend.API + constants.backend.GET_SELLER + "?sellerId=" + item.sellerId)
      .then(res => res.json())
      .then(data => {
        let username = data.sellerUser;
        setSellerUsername(username);
      });
  }

  function checkWishlisted() {
    if (userId && !wishPage) {
      const body = {
        userId: userId,
        itemSellerId: item.sellerId,
        itemId: item.itemId,
        price: item.sellPrice
      }
      fetch(`${constants.backend.API}${constants.backend.WISHES}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(async response => {
        if (response.ok) {
          return response.json();
        } else {
          const err = await response.json();
          throw err;
        }
      }).then((data) => {
        setWishlisted(data.wishId !== null);
        item['wishId'] = data.wishId;
      }).catch((error) => {
        console.error('Error checking wishlist status:', error);
      });
    } else if (wishPage) {
      setWishlisted(true);
    }
  }

  useEffect(() => {
    getBrand();
    checkWishlisted();
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
    <div className="group relative dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform overflow-hidden !border !border-gray-200 dark:!border-none dark:!border-0 dark:border-none !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[19%] w-3/4">

      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="relative">
          <ItemImage itemId={itemType === "hair" ? item.customItemId : item.itemId} itemType={itemType} />
          {
            userId &&
            <WishlistStar
              item={item} isInWishlist={wishlisted} setIsInWishlist={setWishlisted} userId={userId} wishPage={wishPage}
              positionClass={"absolute top-3 right-3 z-10 w-7 h-7"}
            />
          }
        </div>
      </div>

      <div className="px-3 pb-3 flex flex-col justify-between dark:!bg-neutral-800">
        <h3 className={`mb-0 font-bold text-lg leading-tight text-gray-900 dark:text-white line-clamp-2 ${hoverTextColour} transition-colors duration-200`}>
          {item.name}
        </h3>

        <p className="text-gray-600 dark:text-neutral-400 font-medium">
          {brandName}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {item.sellPrice}
              </span>
              <div className="w-5 h-5">
                {getCurrencyIcon({ item })}
              </div>
            </div>

            <div className="flex items-center space-x-1 line-through">
              <span className="text-sm text-gray-500 dark:text-neutral-400">
                {item.originalPrice}
              </span>
              <div className="w-5 h-5 opacity-60">
                {getCurrencyIcon({ item })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-neutral-700">
          <div className="flex items-center space-x-1 flex-1 min-w-0">
            <span className="text-sm text-gray-600 dark:text-neutral-400">
              Sold by
            </span>
            {
              sellerUsername && (
                <div className="flex items-center space-x-1 flex-1 min-w-0">
                  <span className="text-sm text-gray-900 dark:text-white truncate max-w-20">
                    {sellerUsername}
                  </span>
                  <IconButton
                    className="!p-1 !min-w-0 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors duration-200"
                    onClick={() => copy(true)}
                    aria-label="Copy Username"
                  >
                    <ContentCopyIcon style={{ width: '14px' }} className="text-gray-500 dark:text-neutral-400" />
                  </IconButton>
                </div>
              )
            }
          </div>

          <Button
            className={`!rounded-full !px-3 !py-1 !text-xs !font-semibold !min-h-0 !h-7 flex items-center space-x-1 ${idButtonColour} ${itemType === "hair" ? '!text-black hover:!text-black' : '!text-white hover:!text-white'} hover:shadow-md transition-all duration-200 transform`}
            onClick={() => copy(false)}
          >
            <span>ID</span>
            <ContentCopyIcon
              style={{ width: '12px' }}
              className={`${itemType === "hair" ? 'text-black' : 'text-white'}`}
            />
          </Button>
        </div>
      </div>

      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent ${hoverOutlineColour} transition-all duration-300 pointer-events-none`}></div>
    </div>
  )
}

export default ItemCard;
