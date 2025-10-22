const { Categories } = require("../models");

async function validateInsertCategory(req, res, next) {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).send({ error: "Nome é obrigatório." });
    }
    if(name.length > 255) {
        return res.status(400).send({ error: "Nome não pode ter mais de 255 caracteres." });
    }

    try {
        const category = await Categories.findOne({ where: { name } });
        
        if (category) {
            return res.status(400).send({ error: "Categoria já existe." });
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
    
    next();
}

module.exports = {
    validateInsertCategory
}