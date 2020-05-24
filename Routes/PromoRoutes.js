const express = require("express");
const router = express.Router();

const {create, read, search, singlePromoCode, promoById, remove, update} = require("../Controllers/PromoController"); 
const { requireSignin, isAuth, isAdmin, isStoreManager } = require("../Controllers/auth");
const { userById } = require("../Controllers/UserController");

router.post("/admin/addPromocode/:userId", requireSignin, isAuth, isStoreManager, create);
router.get("/admin/getPromocodes/:userId", requireSignin, isAuth, isStoreManager, read);
router.get("/admin/promocodes/:userId/search", requireSignin, isAuth, isStoreManager, search);
router.get("/admin/getSinglePromocode/:userId/search", requireSignin, isAuth, singlePromoCode);
router.delete("/admin/deletePromocode/:userId/:promoId", requireSignin, isAuth, isStoreManager, remove);
router.put("/admin/updatePromocode/:userId/:promoId", requireSignin, isAuth, isStoreManager, update);

router.param("userId", userById);
router.param("promoId", promoById);

module.exports = router;