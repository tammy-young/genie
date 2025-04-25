import 'dotenv/config';
import fetchData from '../utils/fetchData.js';

const BAZAAR_URL = "https://www.stardoll.com/en/com/user/getStarBazaar.php";

async function getBrands() {

  let pageContent = await fetchData(BAZAAR_URL);
  const colours = pageContent.item_colors;
  const brands = pageContent.brands.fashion.brand.concat(pageContent.brands.interior.brand);
  const fashionItemCategories = pageContent.price_tags.fashion.price_tag;
  const interiorItemCategories = pageContent.price_tags.interior.price_tag;

  let brandsIdToName = {};
  brands.map((brand) => {
    brandsIdToName[brand.id] = brand.name;
  })

  let coloursToId = {};
  colours.map((colour) => {
    coloursToId[colour.name] = colour.categoryId;
  })

  let fashionItemCategoriesToId = {};
  fashionItemCategories.map((category) => {
    fashionItemCategoriesToId[category.name] = category.categoryId;
  })

  let interiorItemCategoriesToId = {};
  interiorItemCategories.map((category) => {
    interiorItemCategoriesToId[category.name] = category.categoryId;
  })

  return { "brandsIdToName": brandsIdToName, "coloursToId": coloursToId, "fashionItemCategoriesToId": fashionItemCategoriesToId, "interiorItemCategoriesToId": interiorItemCategoriesToId };
}

export default getBrands;
