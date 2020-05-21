const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../Controllers/auth");
const { userById } = require("../Controllers/UserController");
const { productById } = require("../Controllers/product");
const { create, readWishList, deleteWishList,WishlistById} = require("../Controllers/wishlist");

router.post('/wishlist/create/:userId', requireSignin, isAuth, create)
router.get('/wishlist/readWishList/:userId', requireSignin, isAuth, readWishList)
router.delete( "/wishlist/deleteWishList/:wishlistId/:userId", requireSignin, isAuth, deleteWishList); 


router.param('userId', userById);
router.param('wishlistId', WishlistById);

module.exports = router;