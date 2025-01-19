
const constants = {
    divIds: {
        FASHION_BRAND_DIV: "brandFilterDiv",
        FASHION_PRICE_DIV: "priceFilterDiv",
        FASHION_NAME_DIV: "nameFilterDiv",
        OTHER_FILTERS_DIV: "otherFilersDiv",
        ITEM_PANEL_DIV: "itemPanel",
        SEARCHING_TEXT_DIV: "searchingText",
        BRANDS_NAME_TO_ID: "brandsNameToIdDiv",
        BRANDS_ID_TO_NAME: "brandsIdToNameDiv",
        SELLER_USERNAME_DIV_ID: "sellerUsername",
        SELLER_USERNAME_ID_DIV_ID: "sellerIdDiv",
        COPY_ICON: "copySellerUsername",
        COPY_ID_ICON: "copySellerId",
        EXCLUDED_BRANDS_DIV: "excludedBrandsDiv",
    },
    filterValuesIds: {
        FASHION_BRAND: "brandNameFilter",
        FASHION_PRICE: "fashionPrice",
        FASHION_ITEM_NAME: "fashionItemName",
        FASHION_CURRENCY_TYPE: "fashionCurrencyType",
        FASHION_MIN_PRICE: "fashionMinPrice",
        FASHION_MAX_PRICE: "fashionMaxPrice",
        SHOW_STARDESIGN: "showStardesignFilter",
        SELECTED_CURRENCY: "selectedCurrency"
    },
    buttonIds: {
        SEARCH_BTN: "searchBtn",
        RESET_BTN: "resetBtn"
    },
    colors: {
        PRIMARY: "#A87CFC",
        BACKGROUND: "#FDFBFE",
        LIGHT_GREY: "#e6e6e6"
    },
    brandIdSearchPage: {
        BRAND_ID_SEARCH_INPUT: "brandIdSearchInput"
    },
    paths: {
        FASHION: "/",
        INTERIOR: "/interior",
        ID_SEARCH: "/brands"
    },
    backend: {
        API: "http://localhost:8888",
        GET_BRANDS: "/.netlify/functions/getBrands",
        SEARCH: "/.netlify/functions/search",
        GET_SELLER: "/.netlify/functions/getSeller"
    }
}

export default constants;
