const { sendEmail } = require("../helpers/email-services");
const { encryptUserToken } = require("../helpers/encrypt-user-token");
const { templateEmail } = require("../helpers/templateEmail");
const { Users } = require("../models");

async function createUser(req, res){
    try {
        const user = await Users.create(req.body);

        const token = await encryptUserToken(user);

        const template = await templateEmail(user.name, `${process.env.FRONTEND_URL}/active-user?token=${token}`)

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