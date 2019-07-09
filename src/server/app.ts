import express from "express";
import bodyParser from "body-parser";

import * as crawler from '../crawler'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("good")
});

app.post("/crawl", (req, res) => {
    crawler.run();
    res.status(200).send('Run crawler');
});

export default app;
