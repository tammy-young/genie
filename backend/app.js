import express from 'express';
import 'dotenv/config';
import getBrands from './api/getBrands.js';
import getSeller from './api/getSeller.js';
import search from './api/search.js';

const app = express();
const PORT = 3000;

app.get("/getBrands", (req, res) => {
  getBrands()
    .then(data => {
      res.setHeader("Content-Type", "application/json")
      res.send(JSON.stringify(data, null, 2));
    })
    .catch((e) => {
      console.log("Error: " + e);
    });
});

app.get("/getSeller", (req, res) => {
  let sellerId = req.query.sellerId;
  getSeller(sellerId)
    .then((username) => {
      const data = { "sellerUser": username };
      res.setHeader("Content-Type", "application/json")
      res.send(JSON.stringify(data, null, 2));
    })
    .catch((e) => {
      res.json({ "sellerUser": "" });
    });
});

app.get("/search", async (req, res) => {
  search(req)
    .then(data => {
      res.setHeader("Content-Type", "application/json")
      res.send(JSON.stringify(data, null, 2));
    });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
}
);
