const { sendEmail } = require("../helpers/email-services");
const { templateEmail } = require("../helpers/templateEmail");
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const redisClient = require("../config/redis");

async function createUser(req, res){
    try {
        const user = await Users.create(req.body);

        const hashedUser = await bcrypt.hash(JSON.stringify(user), 10);

        await redisClient.set(`user:${user.id}`, hashedUser, { EX: 7 * 4 * 24 * 60 * 60 })

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