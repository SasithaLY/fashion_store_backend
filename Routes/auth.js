const express = require("express");
const router = express.Router();

const {signUp, signIn, signOut, requireSignin} = require("../Controllers/auth"); 
const {userSignupValidator} = require("../Validators/index");

router.post("/signUp", userSignupValidator, signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);


module.exports = router;

