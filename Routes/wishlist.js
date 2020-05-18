const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../Controllers/auth");
const { userById } = require("../Controllers/UserController");
const { create, readWishList} = require("../Controllers/wishlist");

router.post('/wishlist/create/:userId', requireSignin, isAuth, create)
router.get('/wishlist/readWishList/:userId', requireSignin, isAuth, readWishList)


router.param('userId', userById);

module.exports = router;