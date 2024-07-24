import express from "express";
import cors from 'cors';
import 'dotenv/config';

import search from "./api/search.js";
import getBrands from "./api/getBrands.js";
import getSeller from "./api/getSeller.js";


const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/getSeller", (req, res) => {
    let sellerId = req.query.sellerId;
    getSeller(sellerId)
    .then((username) => {
        res.json({"sellerUser": username});
    })
    .catch((e) => {
        console.log("Error: " + e);
    });
});

app.get("/getBrands", (req, res) => {
    getBrands()
    .then(data => {
        res.json(data);
    })
    .catch((e) => {
        console.log("Error: " + e);
    });
});

app.get("/search", async (req, res) => {
    search(req)
    .then(data => {
        res.json(data);
    });
});

app.get("/test", (req, res) => {
    res.send("Hello, world!");
});
