const app = require("express")();
require('dotenv').config();
const port = process.env.SERVER_PORT || 5000
const dbConnection = require("./config/db");

// For fetching the data form the api intially whenever the server start.
const Product = require("./fetch-data/data");
Product.fetching();

const cors = require('cors');
const bodyParser = require("body-parser");
const { ProductRouter } = require("./routes/routers");


// applying cors
app.use(cors())

// middlewares
app.use(bodyParser.json())

// db connection
dbConnection()

// Router
app.use("/api",ProductRouter)

// server listening
app.listen(port,()=>console.log(`Server listening on ${port} port`))