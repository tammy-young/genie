import constants from "../constants.js";
import fetchData from "./bazaarRequest.js";
import * as cheerio from 'cheerio';


const getSeller = async (sellerId) => {
    let data = await fetchData(constants.backend.SELLER_INFO_URL(sellerId), true);
    const $ = cheerio.load(data);
    return $('.uname').text().trim();
}

export default getSeller;
