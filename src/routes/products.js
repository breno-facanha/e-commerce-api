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

router.get("/service", async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4504', {
            headers: {
                "Authorization": process.env.SECRET_EMAIL_API_KEY
            }
        });
        return res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data from external service", error: error.message });
    }
});


module.exports = router;