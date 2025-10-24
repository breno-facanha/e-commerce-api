const { Products } = require("../models");

async function insertProduct(req, res) {

    try {
        await Products.create(req.body);
        res.status(201).send({ message: "Produto criado com sucesso" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await Products.findAll();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    insertProduct,
    getAllProducts
}