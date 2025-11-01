const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const userMiddleware = require("../middlewares/users");

router.post("/users", 
    userMiddleware.validadeteCreateUsers,
    userController.createUser
);

module.exports = router;