const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");

const { userById } = require("../Controllers/UserController");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.param("userId", userById);

module.exports = router;

