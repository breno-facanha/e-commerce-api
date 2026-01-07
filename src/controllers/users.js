const { sendEmail } = require("../helpers/email-services");
const { Users } = require("../models");

async function createUser(req, res){
    try {
        const user = await Users.create(req.body);

        await sendEmail(
            user.email,
            user.name,
            "Bem-vindo à nossa plataforma!",
            `<h1>Olá, ${user.name}!</h1><p>Obrigado por se cadastrar em nossa plataforma.</p>`
        );

        res.status(201).send({ message: "Usuário criado com sucesso" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error api4467 users" });
    }
}

module.exports = {
    createUser
}