const express = require("express");
const router = express.Router();

const {create, read, search, singleLocation, locationById, remove, update} = require("../Controllers/LocationController"); 
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { userById } = require("../Controllers/UserController");

router.post("/admin/addlocation/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/admin/getlocations/:userId", requireSignin, isAuth, isAdmin, read);
router.get("/admin/locations/:userId/search", requireSignin, isAuth, isAdmin, search);
router.get("/admin/getSinglelocation/:userId/:locationId", requireSignin, isAuth, isAdmin, singleLocation);
router.delete("/admin/deletelocation/:userId/:locationId", requireSignin, isAuth, isAdmin, remove);
router.put("/admin/updatelocation/:userId/:locationId", requireSignin, isAuth, isAdmin, update);

router.param("userId", userById);
router.param("locationId", locationById);

module.exports = router;