exports.userSignupValidator = (req, res, next) => {
    req.check("fName", "First Name is Required!").notEmpty();
    req.check("lName", "Last Name is Required!").notEmpty();
    req.check("gender", "Gender is Required!").notEmpty();
    req.check("email", "Email is Required!")
        .matches(/.+\@.+\..+/)
        .withMessage("Email is not valid!")
        .isLength({
            min: 4,
            max:32
        });
    req.check("password", "Password is Required!").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters!")
        .matches(/\d/)
        .withMessage("Passsword must contain a number!");
        const errors = req.validationErrors()
        if(errors) {
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({error: firstError});
        }
        next();
};