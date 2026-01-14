require('dotenv').config();
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

async function decryptUserToken(token) {
    try {
        const bytes = CryptoJS.AES.decrypt(token, process.env.ENCRYPTION_SECRET);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalText);
    } catch (error) {
        console.log("Erro ao descriptografar o token do usuário", error);
        return null;
    }
}

module.exports = {
    encryptUserToken,
    decryptUserToken
};