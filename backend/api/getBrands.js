import constants from "../constants.js";
import fetchData from "./bazaarRequest.js";


const getBrands = async () => {
    
    let pageContent = await fetchData(constants.backend.BAZAAR_URL);
    let brands = pageContent.brands.fashion.brand;

    let brandsIdToName = {};
    brands.map((brand) => {
        brandsIdToName[brand.id] = brand.name;
    })

    let brandsNameToId = {};
    brands.map((brand) => {
        brandsNameToId[brand.name] = brand.id;
    })

    return {"brandsIdToName": brandsIdToName, "brandsNameToId": brandsNameToId};
}

export default getBrands;
