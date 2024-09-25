import express from "express";
import cors from 'cors';
import 'dotenv/config';
import ServerlessHttp from "serverless-http";
import * as cheerio from 'cheerio';


const sellerInfoUrl = (id) => { return `http://www.stardoll.com/en/user/album.php?id=${id}` }

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

const getSeller = async (sellerId) => {
    let data = await fetchData(sellerInfoUrl(sellerId), true);
    const $ = cheerio.load(data);
    return $('.uname').text().trim();
}

const app = express();
app.use(cors())

app.get("/.netlify/functions/getSeller", (req, res) => {
    let sellerId = req.query.sellerId;
    getSeller(sellerId)
    .then((username) => {
        res.json({"sellerUser": username});
    })
    .catch((e) => {
        res.json({"sellerUser": ""});
    });
});

const handler = ServerlessHttp(app);
module.exports.handler = async(event, context) => {
    const result = handler(event, context);
    return result;
}
