const { uploadAndSaveProductImages } = require("../helpers/product-images-upload");
const { Products } = require("../models");

async function insertProduct(req, res) {

    try {
        const productData = {...req.body};
        console.log("Dados do produto recebidos:", productData);

        const products = await Products.create(productData);
        let images = [];

        try {
            images = await uploadAndSaveProductImages(products.id, req.files);
        } catch (error) {
            console.error("Erro ao fazer upload das imagens:", error);
        }

        return res.status(201).send({
            message: "Produto criado com sucesso",
               
                images: images.map(img => ({
                    url: img.url
                }))
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// async function getAllProducts(req, res) {
//     try {
//         const products = await Products.findAll();
//         res.status(200).send(products);
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// }

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