import 'dotenv/config';
import * as cheerio from 'cheerio';
import fetchData from "../utils/fetchData.js";

const sellerInfoUrl = (id) => { return `http://www.stardoll.com/en/user/sellItems.php?id=${id}` }

async function getSeller(sellerId) {
  let data = await fetchData(sellerInfoUrl(sellerId), true);
  const $ = cheerio.load(data);
  return $('.uname').text().trim();
}

export default getSeller;
