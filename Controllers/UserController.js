const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken'); //to generate signed token
const expressjwt = require('express-jwt'); //for auth check
const { errorHandler } = require("../Helpers/dbErrorHandler");

exports.signUp = (req, res) => {
    //console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signIn = (req, res) => {
    //find user via email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email doesn't exist. Please SignUp!"
            });
        }
        //if a user found match email and password
        //use authenticate method in UserModel
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password don't match!"
            })
        }
        //generate a signed in token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //store the token 't' in cookie with expiry date 
        res.cookie('t', token, { expire: new Date() + 9999 });
        //return token wiht user to the frontend
        const { _id, fName, email, role } = user;
        return res.json({ token, user: { _id, fName, email, role } });
    });
}

exports.signOut = (req, res) => {
    res.clearCookie("t");
    res.json({message: "Sucesfully Signed Out!"});
}
