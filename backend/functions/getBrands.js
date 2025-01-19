import express from "express";
import cors from 'cors';
import 'dotenv/config';
import ServerlessHttp from "serverless-http";
import fetch from 'node-fetch';


const BAZAAR_URL = "https://www.stardoll.com/en/com/user/getStarBazaar.php";
const EXTRA_INTERIOR_BRANDS = [{
    "id": 534,
    "name": "Basic Decor",
  },
  {
    "id": 983,
    "name": "Callie's Pop Up Shop Decor",
  },
  {
    "id": 712,
    "name": "Pretty n' Love Decor",
  }];

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

const getBrands = async (req) => {

    const itemType = req.query.itemType;
    let brands = {};
    
    let pageContent = await fetchData(BAZAAR_URL);

    if (itemType === "fashion") {
        brands = pageContent.brands.fashion.brand;
    } else if (itemType === "interior") {
        brands = pageContent.brands.interior.brand.concat(EXTRA_INTERIOR_BRANDS);
    } else {
        brands = pageContent.brands.fashion.brand.concat(pageContent.brands.interior.brand);
    }

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

const app = express();
app.use(cors())

app.get("/.netlify/functions/getBrands", (req, res) => {
    getBrands(req)
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
