const CryptoJS = require("crypto-js");
const redisClient = require("../config/redis");

async function encryptUserToken(user) {
    try {
        
        const hashedUser = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            process.env.ENCRYPTION_SECRET
        ).toString();

        await redisClient.set(`user:${user.id}`, hashedUser, { EX: 7 * 4 * 24 * 60 * 60 })

        return hashedUser;
    } catch (error) {
        throw new Error("Erro ao criptografar o token do usuário", error);
    }
    
}

module.exports = {
    encryptUserToken
};