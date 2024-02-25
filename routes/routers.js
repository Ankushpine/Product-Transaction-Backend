const express = require("express");
const router = express.Router();
const {
  transactions,
  statistics,
  priceRange,
  piechart,
  getAll,
} = require("../controller/Product-Controller");

// Get all products
router.get("/transactions", transactions);

// Get Statistics of the given month
router.get("/statistics", statistics);

// Get Price Range of the given month for Bar Chart
router.get("/pricerange", priceRange);

// Get Pie chart of the given month 
router.get("/piechart", piechart);

// API for fetched the data from all the above 3 APIs
router.get("/", getAll);

module.exports = { ProductRouter: router };
