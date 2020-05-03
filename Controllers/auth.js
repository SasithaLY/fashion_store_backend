const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken'); //to generate signed token
const expressjwtAuth = require('express-jwt'); //for auth check
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
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password don't match!"
            })
        }
        //generate a signed in token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //store the token 't' in cookie with expiry date 
        res.cookie('t', token, { expire: new Date() + 9999 });
        //return token wiht user to the frontend
        const { _id, fName, lName, email, gender, role } = user;
        return res.json({ token, user: { _id, fName, lName, email, gender, role } });
    });
}

exports.signOut = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Sucesfully Signed Out!" });
};

exports.requireSignin = expressjwtAuth({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access Denied!"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource! Access Denied!"
        });
    }
    next();
};