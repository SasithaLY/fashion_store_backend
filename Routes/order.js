const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { userById, addOrderToHistory } = require("../Controllers/UserController");
const { create, getOrders, getStates, orderById, updateStatus } = require("../Controllers/order");
const { deductQuantity } = require("../Controllers/product");


router.post('/order/create/:userId', requireSignin, isAuth, deductQuantity, addOrderToHistory, create);
router.get('/order/getlist/:userId', requireSignin, isAuth, isAdmin, getOrders);
router.get('/order/states/:userId', requireSignin, isAuth, isAdmin, getStates);
router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin, updateStatus);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;