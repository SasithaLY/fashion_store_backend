const express = require("express");
const router = express.Router();

const {create, read, remove, update, addressById} = require("../Controllers/address"); 
const { requireSignin, isAuth} = require("../Controllers/auth");
const { userById } = require("../Controllers/UserController")

router.post("/address/create/:userId", requireSignin, isAuth, create);
router.get("/address/by/user/:userId", requireSignin, isAuth, read);
router.delete("/address/:addressId/:userId", requireSignin, isAuth, remove);
router.put("/address/:addressId/:userId", requireSignin, isAuth, update);

router.param("userId", userById);
router.param("addressId", addressById);

module.exports = router;

