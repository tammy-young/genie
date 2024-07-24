
const constants = {
    backend: {
        BAZAAR_URL: "https://www.stardoll.com/en/com/user/getStarBazaar.php",
        SEARCH_URL_PART: "?search&type=fashion&Price=24",
        ITEM_IMAGE_URL: (id) => { return `http://cdn.stardoll.com/itemimages/76/0/98/${id}.png` },
        SELLER_INFO_URL: (id) => { return `http://www.stardoll.com/en/user/album.php?id=${id}` },
        ITEM_INFO: ["brand", "name", "currencyType", "originalPrice", "sellPrice", "sellerId"],
        MAX_ITEMS_AT_ONCE: 20,
        LOGIN_URL: "https://www.stardoll.com/en/do/login.php",
        STARDOLL_BASE_URL: "https://www.stardoll.com"
    }
}

export default constants;
