const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '15mb' }));
app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }))
app.use(bodyParser.json());

//.env file contains configuration variables
dotenv.config({ path: './config.env' })

//DB connection
require('./db/conn');

//app.use(express.json());: This middleware allows the server to parse JSON data from incoming requests.

//router file to make different authentication-related routes.
app.use(require('./router/auth'));

//retrive data from config file
const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})