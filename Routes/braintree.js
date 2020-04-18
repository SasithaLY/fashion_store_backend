const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../Controllers/auth");
const { userById } = require("../Controllers/UserController");
const { generateToken } = require("../Controllers/braintree");

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken);

router.param('userId', userById);

module.exports = router;