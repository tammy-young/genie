import express from "express";
import cors from 'cors';
import 'dotenv/config';
import ServerlessHttp from "serverless-http";
import fetch from 'node-fetch';


const BAZAAR_URL = "https://www.stardoll.com/en/com/user/getStarBazaar.php";

async function fetchData(url, html=false) {
    try {
        const response = await fetch(url, {
            withCredentials: true,
            headers: {
                Cookie: "pdhUser=" + process.env.PDH_USER + ";"
            }
        });
        const data = html? response.text() : response.json();
        return data;
    } catch (e) {
        console.error("Could not get response:", e);
    }
}

const getBrands = async () => {

    let pageContent = await fetchData(BAZAAR_URL);
    const colours = pageContent.item_colors;
    const brands = pageContent.brands.fashion.brand.concat(pageContent.brands.interior.brand);
    const fashionItemCategories = pageContent.price_tags.fashion.price_tag;
    const interiorItemCategories = pageContent.price_tags.interior.price_tag;

    let brandsIdToName = {};
    brands.map((brand) => {
        brandsIdToName[brand.id] = brand.name;
    })

    let brandsNameToId = {};
    brands.map((brand) => {
        brandsNameToId[brand.name] = brand.id;
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

    return {"brandsIdToName": brandsIdToName, "brandsNameToId": brandsNameToId, "coloursToId": coloursToId, "fashionItemCategoriesToId": fashionItemCategoriesToId, "interiorItemCategoriesToId": interiorItemCategoriesToId};
}

const app = express();
app.use(cors())

app.get("/.netlify/functions/getBrands", (req, res) => {
    getBrands()
    .then(data => {
        res.json(data);
    })
    .catch((e) => {
        console.log("Error: " + e);
    });
});

const handler = ServerlessHttp(app);
module.exports.handler = async(event, context) => {
    const result = handler(event, context);
    return result;
}
