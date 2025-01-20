const express = require("express");
const UserController = require("../controllers/UserController");
const { validator } = require("../middlewares");
const { AuthMiddleware } = require("../middlewares");
const router = express.Router();

router.get("/info", AuthMiddleware.authenticate, validator, UserController.getUser);

module.exports = router;
