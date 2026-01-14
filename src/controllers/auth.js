const jwt = require("jsonwebtoken");
const { decryptUserToken } = require("../helpers/encrypt-user-token");
const redisClient = require("../config/redis");
const Users = require("../models/users");

async function login(req, res){
    try {
        const user = req.user;

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        return res.send({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image_url
            }
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

async function activeUser(req, res){
      
    try {
        const { token } = req.body;

        const cleanedToken = token.replace(/ /g, '+');
          
        const user = await decryptUserToken(cleanedToken);
        
        if(!user){
            return res.status(400).send({ error: "Token invalido." });
        }

        const redisToken = await redisClient.get(`user:${user.id}`);

        if(!redisToken || redisToken !== cleanedToken){
            return res.status(400).send({ error: "Token invalido ou expirado." });
        }

        await Users.update(
            { active: true },
            { where: { id: user.id } }
        );

        await redisClient.del(`user:${user.id}`);

        return res.send({ message: "Usuário ativado com sucesso." });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

async function getActiveTokenData(req, res) {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    login,
    activeUser
}