const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const user = req.user ;
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).send({ token, user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        } });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    login
}