const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../Controllers/auth");
const { userById, addOrderToHistory } = require("../Controllers/UserController");
const { create } = require("../Controllers/order");
const { deductQuantity } = require("../Controllers/product");


router.post('/order/create/:userId', requireSignin, isAuth, addOrderToHistory, deductQuantity, create);

router.param('userId', userById);

module.exports = router;