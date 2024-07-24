import constants from "../constants.js";
import fetchData from "./bazaarRequest.js";


const ITEMS_KEY = "items";

const getHeader = (req, headerName) => {
    return req.headers[headerName]? req.headers[headerName] : "";
}

const getItemInfo = async (item) => {
    let itemId = item['itemId'];
    let itemInfo = {};
    constants.backend.ITEM_INFO.forEach(info => {
        itemInfo[info] = item[info];
    })
    itemInfo["itemImage"] = constants.backend.ITEM_IMAGE_URL(itemId);
    return itemInfo;
}

const search = async (req) => {

    let searchUrl = constants.backend.BAZAAR_URL + constants.backend.SEARCH_URL_PART;
    let itemName = req.query.itemName.toLowerCase();

    let brandId = req.query.brandId;
    searchUrl += brandId !== ""? `&brands=${brandId}` : "";

    let minPrice = req.query.minPrice;
    searchUrl += minPrice !== ""? `&minPrice=${minPrice}` : "";

    let maxPrice = req.query.maxPrice;
    searchUrl += maxPrice !== ""? `&maxPrice=${maxPrice}` : "";

    let currencyType = req.query.currencyType;
    searchUrl += (minPrice || maxPrice) && (currencyType !== "")? `&currencyType=${currencyType}` : "";

    let items = [];
    let itemIds = [];
    let stopSearchTime = Date.now() + 10000;

    while (Date.now() < stopSearchTime && items.length < constants.backend.MAX_ITEMS_AT_ONCE) {
        let returnedPage = await fetchData(searchUrl);

        // if there are no items on the page then get a new page
        if (returnedPage != null && ITEMS_KEY in returnedPage) {
            let returned_items = returnedPage[ITEMS_KEY];

            for (let item of returned_items) {
                let itemId = item['itemId'];
                let addItem = false;

                if (itemName !== "") {
                    let searchedItemName = item.name.toLowerCase();
                    if (searchedItemName.includes(itemName)) {
                        addItem = true;
                    }
                } else {
                    if (!itemIds.includes(itemId)) {
                        addItem = true;
                        itemIds.push(itemId);
                    }
                }
                    
                if (addItem) {
                    let itemInfo = await getItemInfo(item);
                    items.push(itemInfo);
                }

                if (items.length >= constants.backend.MAX_ITEMS_AT_ONCE) {
                    break;
                }
            }
        }
    }

    return {"items": items};
}

export default search;
