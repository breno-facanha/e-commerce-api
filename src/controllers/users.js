const { sendEmail } = require("../helpers/email-services");
const { templateEmail } = require("../helpers/templateEmail");
const { Users } = require("../models");

async function createUser(req, res){
    try {
        const user = await Users.create(req.body);

        const template = await templateEmail(user.name, "https://google.com")

        await sendEmail(
            user.email,
            user.name,
            "Bem-vindo à nossa plataforma!",
            template
        );

        res.status(201).send({ message: "Usuário criado com sucesso" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error api4467 users" });
    }
}

module.exports = {
    createUser
}