
const constants = {
    divIds: {
        FASHION_BRAND_DIV: "brandFilterDiv",
        FASHION_PRICE_DIV: "priceFilterDiv",
        FASHION_NAME_DIV: "nameFilterDiv",
        OTHER_FILTERS_DIV: "otherFilersDiv",
        ITEM_PANEL_DIV: "itemPanel",
        SEARCHING_TEXT_DIV: "searchingText",
        BRANDS_ID_TO_NAME: "brandsIdToNameDiv",
        SELLER_USERNAME_DIV_ID: "sellerUsername",
        SELLER_USERNAME_ID_DIV_ID: "sellerIdDiv",
        COPY_ICON: "copySellerUsername",
        COPY_ID_ICON: "copySellerId",
        EXCLUDED_BRANDS_DIV: "excludedBrandsDiv",
        EXCLUDED_BRANDS_SECTION: "excludedBrandsSection"
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
        PRIMARY_LIGHT: "#f6f1fe",
        BACKGROUND: "#FDFBFE",
        LIGHT_GREY: "#e6e6e6",
        FASHION: '#ee6fb3',
        INTERIOR: '#51c0cb'
    },
    brandIdSearchPage: {
        BRAND_ID_SEARCH_INPUT: "brandIdSearchInput"
    },
    paths: {
        FASHION: "/",
        INTERIOR: "/interior",
        JEWELRY: "/jewelry",
        HAIR: "/hair",
        ID_SEARCH: "/brands",
        PROFILE: "/profile",
        WISHES: "/wishes"
    },
    backend: {
        API: process.env.REACT_APP_API_URL,
        GET_BRANDS: "/api/brands",
        SEARCH: "/api/search",
        GET_SELLER: "/api/seller",
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
        USERS: "/users/",
        WISHES: "/wishes"
    }
}

export default constants;
