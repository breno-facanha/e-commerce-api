const emailApi = require("../services/emailApi");

async function sendEmail(to, toName, subject, html) {
    try {
        await emailApi.post("/email/send", {
            to,
            toName,
            subject,
            html
        });
    } catch (error) {
        throw new Error("Erro ao enviar email", error);
    }
}

module.exports = {
    sendEmail
}