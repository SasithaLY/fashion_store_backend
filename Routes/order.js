const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { userById, addOrderToHistory } = require("../Controllers/UserController");
const { create, getOrders } = require("../Controllers/order");
const { deductQuantity } = require("../Controllers/product");


router.post('/order/create/:userId', requireSignin, isAuth, deductQuantity, addOrderToHistory, create);
router.get('/order/getlist/:userId', requireSignin, isAuth, isAdmin, getOrders)

router.param('userId', userById);

module.exports = router;