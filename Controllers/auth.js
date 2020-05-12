const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken'); //to generate signed token
const expressjwtAuth = require('express-jwt'); //for auth check
const { errorHandler } = require("../Helpers/dbErrorHandler");
// const SendGrid = require("sendgrid-web")
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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');
const nodemailer = require('nodemailer');

exports.signUp = (req, res) => {
    //console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((error, user) => {
        if (error) {
            console.log(error)
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });

        // if (req.body.role === 2) {

        //     console.log("req.body", req.body);

        //     var sendgrid = new SendGrid({
        //         user: "fashionstoreaf",
        //         pass: "AFproject2020"
        //     })

        //     sendgrid.send({
        //         to: 'pasannethsara@gmail.com', // admin
        //         from: 'fashiostoreaf2020@gmail.com',
        //         subject: `A new order is received`,
        //         html: `
        //         <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
        //         <h2>Customer name: ${req.body.email}</h2>
        //         <p>Login to your dashboard</a> to see the order in detail.</p>
        //     `
        //     }, function(err) {
        //         if(err) {
        //             console.log("Failed", err)
        //         }
        //         else {
        //             console.log("Success")
        //         }
        //     });
        // }


        // if (req.body.role === 2) {

        //     console.log("req.body", req.body);

        //     const emailData = {
        //         to: 'pasannethsara@gmail.com', // admin
        //         from: 'fashiostoreaf2020@gmail.com',
        //         subject: `A new order is received`,
        //         html: `
        //     <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
        //     <h2>Customer name: ${req.body.email}</h2>
        //     <p>Login to your dashboard</a> to see the order in detail.</p>
        // `
        //     };

        //     sgMail
        //         .send(emailData)
        //         .then(sent => console.log('SENT >>>', sent))
        //         .catch(err => console.log('ERR >>>', err));

        // }

        if (req.body.role === 2) {

            console.log("req.body", req.body);

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                // host: 'smtp.gmail.com',
                // port: 587,
                // secure: true,
                auth: {
                    user: "fashiostoreaf2020@gmail.com",
                    pass: "@fProject2o2o"
                },
                // tls: true
            })

            let mailOptions = {
                from: 'fashiostoreaf2020@gmail.com',
                to: 'pasannethsara@gmail.com',
                subject: 'Hi! Welcoming you as a Store Manager.',
                text: "We have successfully created ypur account as a store manager."
            };

            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log('Email Send Failed!', err)
                }
                else {
                    console.log('Email Sent!')
                }
            })
        }
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
    if (req.profile.role === 0 || req.profile.role === 2) {
        return res.status(403).json({
            error: "Admin resource! Access Denied!"
        });
    }
    next();
};

exports.isStoreManager = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Store Manager resource! Access Denied!"
        });
    }
    next();
};

exports.isOwner = (req, res, next) => {
    console.log(req.profile._id)
    console.log(req.product.storeMgrID)
    if (req.profile._id !== req.product.storeMgrID) {
        return res.status(403).json({
            error: "Access Denied!"
        });
    }
    next();
};