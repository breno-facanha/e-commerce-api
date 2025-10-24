const { Categories } = require("../models");

async function insertCategory(req, res) {

    try {
        await Categories.create(req.body);
        res.status(201).send({ message: "Categoria criada com sucesso" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    insertCategory
}