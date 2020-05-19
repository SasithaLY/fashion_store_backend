const express = require("express");
const router = express.Router();

const {create, read, search, singlePromoCode, promoById, remove, update} = require("../Controllers/PromoController"); 
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { userById } = require("../Controllers/UserController");

router.post("/admin/addPromocode/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/admin/getPromocodes/:userId", requireSignin, isAuth, isAdmin, read);
router.get("/admin/promocodes/:userId/search", requireSignin, isAuth, isAdmin, search);
router.get("/admin/getSinglePromocode/:userId/search", requireSignin, isAuth, singlePromoCode);
router.delete("/admin/deletePromocode/:userId/:promoId", requireSignin, isAuth, isAdmin, remove);
router.put("/admin/updatePromocode/:userId/:promoId", requireSignin, isAuth, isAdmin, update);

router.param("userId", userById);
router.param("promoId", promoById);

module.exports = router;