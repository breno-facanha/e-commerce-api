const bcrypt = require("bcrypt");
const { Users } = require("../models");

async function validadeteCreateUsers(req, res, next){
    const { name, password, email, role } = req.body;

    if (!name || !password || !email || !role) {
        return res.status(400).send({
            error: "Todos os campos são obrigatórios"
        });
    }

    if ( password.length < 6 ) {
        return res.status(400).send({
            error: "Senha deve ter no mínimo 6 caracteres"
        });
    }

    try {
        const existUser = await Users.findOne({ where: { email } });
        if (existUser) {
            return res.status(400).send({
                error: "Usuário com esse e-mail já existe"
            });
        }
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
    req.body.password = hashedPassword; // Substitui a senha pela versão hashada

    next(); 
    
}

module.exports = {
    validadeteCreateUsers
}