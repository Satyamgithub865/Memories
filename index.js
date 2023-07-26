import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import Router from './router/route.js';
import path from 'path'

const __dirname = path.resolve();

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

const URL = process.env.DB_URL;
Connection(URL)

app.use('/', Router)

app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', function (_, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function (err) {
        res.status(500).send(err);
    })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log(`server is running successfully in port ${PORT}`) });