const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewere/auth");
const UserController = require("../controllers/UserController");

router.post("/login", UserController.loginUser);

router.use(authUser)
router.post("/register", UserController.registerUser);

module.exports = router;