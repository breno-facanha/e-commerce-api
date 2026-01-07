const express = require("express");
const router = express.Router();
const productsMiddleware = require("../middlewares/product");
const productsController = require("../controllers/product");
const { authToken } = require("../middlewares/authToken");
const axios = require("axios");

router.post("/",
    authToken(['seller']), 
    productsMiddleware.validateInsertProduct,
    productsController.insertProduct
);

router.get("/",
    productsController.getAllProducts
);

module.exports = router;