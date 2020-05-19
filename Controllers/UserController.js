const User = require("../Models/UserModel");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found!",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this operation!",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.addOrderToHistory = (req, res, next) => {
  let history = [];
  console.log("adding to history");
  req.body.order.products.forEach((i) => {
    history.push({
      _id: i._id,
      name: i.name,
      description: i.description,
      category: i.category,
      quantity: i.count,
      transactionId: req.body.order.transactionId,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: 'Could not update the purchase history'
        })
      }
      next();
    });
};

exports.listUsers = (req, res) => {
  User.find()
    .populate("user", "_id fName lName, gender, role")
    .sort("-created")
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: 'Could not get all users'
        })
      }
      res.json(orders);
    })
}
