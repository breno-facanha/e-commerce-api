const { Users } = require("../models");

async function createUser(req, res){
    try {
        await Users.create(req.body);
        res.status(201).send({ message: "Usuário criado com sucesso" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    createUser
}