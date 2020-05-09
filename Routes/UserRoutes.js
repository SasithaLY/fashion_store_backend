const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");

const { userById, read, update } = require("../Controllers/UserController");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get("/user/:userId",  isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;

