const { Users } = require("../models");
const bcrypt = require("bcrypt");

async function validateLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "Email e senha são obrigatórios." });
    }

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(401).send({ error: "Usuário não encontrado" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).send({ error: "Senha inválida." });
        }

        req.user = user; // Adiciona o usuário autenticado ao objeto de requisição
        next();
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

module.exports = {
    validateLogin
}