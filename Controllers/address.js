const Address = require("../Models/Address");
const { errorHandler } = require("../Helpers/dbErrorHandler");

exports.create = (req, res) => {
  req.body.user = req.profile;
  const address = new Address(req.body);

  address.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json({ data });
    }
  });
};

exports.read = (req, res) => {
  Address.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, addresses) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(addresses);
      }
    });
};

exports.addressById = (req, res, next, id) => {
  Address.findById(id).exec((err, address) => {
    if (err || !address) {
      return res.status(400).json({
        error: "Address not found",
      });
    } else {
      req.address = address;
    }
    next();
  });
};

exports.remove = (req, res) => {
  let address = req.address;
  address.remove((err, deletedAddress) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json({
        message: "Address Removed Successfully",
      });
    }
  });
};

exports.update = (req, res) => {
  Address.findOneAndUpdate(
    { _id: req.address._id },
    { $set: req.body },
    { new: true },
    (err, address) => {
        if(err) {
            return res.status(400).json({
                error:"Address not updated"
            });
        }else{
            res.json(address);
        }
    }
  );
};
