const express = require("express");
const router = express.Router();

//User Model
const User = require("../Models/UserModel");

//get all users
router.get("/", (req, res) => {
    User.find()
        .then(users => res.json(users))
});

//post a user
router.post("/", (req, res) => {
    const newUser = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender
    });

    newUser.save().then(user => res.json(user));
});

//delete a user
router.delete("/:id", (req, res) => {
    User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;