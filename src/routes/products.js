const express = require("express");
const router = express.Router();
const productsMiddleware = require("../middlewares/product");
const productsController = require("../controllers/product");

router.post("/", 
    productsMiddleware.validateInsertProduct,
    productsController.insertProduct
);

router.get("/",
    productsController.getAllProducts
);

module.exports = router;