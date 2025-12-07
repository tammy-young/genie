import constants from '../constants';
import { useEffect, useState } from 'react';
import '../App.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
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

function NotAvailableCard({ item, brandName }) {

  function unwish() {
    fetch(`${constants.backend.API}${constants.backend.WISHES}/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      }
    });
  }

  return (
    <div className="group relative bg-[#ffffff] dark:bg-neutral-800 rounded-2xl shadow-md transition-all duration-300 overflow-hidden border-[1px] border-gray-200 dark:border-transparent !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[19%] w-3/4 p-6">
      <div className="flex flex-col space-y-4">
        <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-white">
          {item.name} ({brandName}) is no longer available.
        </h3>
        <p className="text-gray-600 dark:text-neutral-400">
          This item has been removed from Starbazaar.
        </p>
        <button
          className="px-4 py-2 rounded-xl border-[1px] border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 font-semibold"
          onClick={unwish}
        >
          Unwish
        </button>
      </div>
    </div>
  )
}

function SkeletonItemCard() {
  return (
    <div className="group h-[387.5px] sm:h-[339.5px] xl:h-[387.5px] relative bg-[#ffffff] dark:bg-neutral-800 rounded-2xl shadow-md overflow-hidden border-[1px] border-gray-200 dark:border-transparent !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[19%] w-3/4">

      {/* Image Skeleton */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <Skeleton
          variant="rectangular"
          className="w-full sm:!h-44 h-56 lg:!h-56 !bg-gray-200 dark:!bg-neutral-700"
          animation="wave"
        />
      </div>

      {/* Content Skeleton */}
      <div className="px-3 pb-3 pt-3 space-y-3">
        <div>
          {/* Title Skeleton */}
          <Skeleton
            variant="text"
            className="!text-lg !bg-gray-200 dark:!bg-neutral-700"
            width="85%"
            animation="wave"
          />

          {/* Brand Skeleton */}
          <Skeleton
            variant="text"
            className="!text-sm !bg-gray-200 dark:!bg-neutral-700"
            width="60%"
            animation="wave"
          />
        </div>

        {/* Price Section Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton
              variant="text"
              className="!text-xl !bg-gray-200 dark:!bg-neutral-700"
              width={60}
              animation="wave"
            />
            <Skeleton
              variant="text"
              className="!text-sm !bg-gray-200 dark:!bg-neutral-700"
              width={40}
              animation="wave"
            />
          </div>
        </div>

        {/* Bottom Section Skeleton */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-neutral-700">
          <div className="flex items-center space-x-2">
            <Skeleton
              variant="text"
              className="!text-sm !bg-gray-200 dark:!bg-neutral-700"
              width={80}
              animation="wave"
            />
          </div>
          <Skeleton
            variant="rounded"
            className="!bg-gray-200 dark:!bg-neutral-700 !rounded-full"
            width={50}
            height={28}
            animation="wave"
          />
        </div>
      </div>
    </div>
  )
}

const ItemCard = ({ item, itemType, allBrands, userId = "", wishPage = false }) => {
  const [sellerUsername, setSellerUsername] = useState("");
  const [brandName, setBrandName] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const [available, setAvailable] = useState(-1);   // -1: unknown, 0: not available, 1: available, 2: unsure

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

  function getSeller() {
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
        // console.error('Error checking wishlist status:', error);
      });
    } else if (wishPage) {
      setWishlisted(true);
    }
  }

  function checkAvailabile() {
    fetch(`${constants.backend.API}${constants.backend.WISHES}/available`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wishId: item.id })
    }).then(async response => {
      if (response.ok) {
        return response.json();
      } else {
        const err = await response.json();
        throw err;
      }
    }).then((data) => {
      setAvailable(data.available ? 1 : 0);
    }).catch((error) => {
      setAvailable(2);
    });
  }

  useEffect(() => {
    checkWishlisted();
    if (wishPage) {
      checkAvailabile();
    } else {
      getSeller();
    }
    // eslint-disable-next-line
  }, []);

  function copy(username) {
    if (username && !wishPage) {
      navigator.clipboard.writeText(sellerUsername);
    } else if (username && wishPage) {
      navigator.clipboard.writeText(item.sellerUsername);
    } else {
      navigator.clipboard.writeText(item.sellerId);
    }
  }

  useEffect(() => {
    if (allBrands.length > 0) {
      let brandObject = allBrands.find(brand => brand.brandId === parseInt(item.brand));
      setBrandName(brandObject?.name.replace(/&amp;/g, "&"));
    }
    // eslint-disable-next-line
  }, [allBrands]);

  return (
    wishPage && available === -1 ? <SkeletonItemCard /> : (
      wishPage && available === 0 ? <NotAvailableCard item={item} brandName={brandName} /> : (
        <div className="group relative dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform overflow-hidden !border !border-gray-200 dark:!border-none dark:!border-0 dark:border-none !min-w-[270px] sm:max-w-[30%] md:max-w-[32%] lg:max-w-[23.5%] 2xl:max-w-[19%] w-3/4 flex flex-col">

          <div className="relative overflow-hidden rounded-t-2xl flex-shrink-0">
            <div className="relative">
              <ItemImage itemId={itemType === "hair" ? item.customItemId : item.itemId} itemType={itemType} />
              {
                userId &&
                <WishlistStar
                  item={item} isInWishlist={wishlisted} setIsInWishlist={setWishlisted} userId={userId} wishPage={wishPage}
                  positionClass={"absolute top-3 right-3 z-10 w-7 h-7"} sellerUsername={sellerUsername}
                />
              }
            </div>
          </div>

          <div className="p-3 flex flex-col justify-between dark:!bg-neutral-800 flex-1">
            <div>
              <h3 className={`mb-0 font-bold text-lg leading-tight text-gray-900 dark:text-white line-clamp-2 ${hoverTextColour} transition-colors duration-200`}>
                {item.name}
              </h3>

              <p className="text-gray-600 dark:text-neutral-400 font-medium pb-0 mb-2">
                {brandName}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
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

              <div className="flex flex-col justify-between pt-2 border-t border-gray-100 dark:border-neutral-700">
                <div className='flex flex-row items-center justify-between w-full'>
                  <div className="flex items-center space-x-1 flex-1 min-w-0">
                    <span className="text-sm text-gray-600 dark:text-neutral-400">
                      Sold by
                    </span>
                    {
                      wishPage ? (
                        <div className="flex items-center space-x-1 flex-1 min-w-0">
                          <span className="text-sm text-gray-900 dark:text-white truncate max-w-20">
                            {item.sellerUsername}
                          </span>
                          {
                            item.sellerUsername ? (
                              <IconButton
                                className="!p-1 !min-w-0 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors duration-200"
                                onClick={() => copy(true)}
                                aria-label="Copy Username"
                              >
                                <ContentCopyIcon style={{ width: '14px' }} className="text-gray-500 dark:text-neutral-400" />
                              </IconButton>
                            ) : null
                          }
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 flex-1 min-w-0">
                          <span className="text-sm text-gray-900 dark:text-white truncate max-w-20">
                            {sellerUsername}
                          </span>
                          {
                            sellerUsername ? (
                              <IconButton
                                className="!p-1 !min-w-0 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors duration-200"
                                onClick={() => copy(true)}
                                aria-label="Copy Username"
                              >
                                <ContentCopyIcon style={{ width: '14px' }} className="text-gray-500 dark:text-neutral-400" />
                              </IconButton>
                            ) : null
                          }
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
                {
                  available === 2 ? (
                    <p className="text-sm text-gray-600 dark:text-neutral-400 m-0 p-0 mt-1">
                      Availability unknown. Please check manually or refresh the page.
                    </p>
                  ) : null
                }
              </div>
            </div>
          </div>

          <div className={`absolute inset-0 rounded-2xl border-2 border-transparent ${hoverOutlineColour} transition-all duration-300 pointer-events-none`}></div>
        </div>
      )
    )
  );
}

export default ItemCard;
