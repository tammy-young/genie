import express from "express";
import cors from 'cors';
import 'dotenv/config';
import ServerlessHttp from "serverless-http";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/.netlify/functions/api", (req, res) => {
    return res.json({"message": "Hello Genie users!"});
})

const handler = ServerlessHttp(app);
module.exports.handler = async(event, context) => {
    const result = handler(event, context);
    return result;
}
