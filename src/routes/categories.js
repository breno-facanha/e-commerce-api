const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories");
const categoriesMiddleware = require("../middlewares/categories");   

router.post("/", 
    categoriesMiddleware.validateInsertCategory,
    categoriesController.insertCategory
);

module.exports = router;