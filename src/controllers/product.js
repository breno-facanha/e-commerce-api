const productsModel = require("../models/legacy/prod");

async function insertProduct(req, res) {
    const { name, category, price } = req.body;
    try {
        await productsModel.insertProduct(req.body);
        res.status(201).send({ message: "Produto criado com sucesso" });
    } catch (error) {
        console.error("Error ao inserir produto:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await productsModel.getAllProducts();
        res.status(200).send(products);
    } catch (error) {
        console.error("Error ao buscar produtos:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

module.exports = {
    insertProduct,
    getAllProducts
}