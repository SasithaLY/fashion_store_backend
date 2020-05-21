const Promo = require("../Models/PromoCode");
const { errorHandler } = require("../Helpers/dbErrorHandler");

exports.create = (req, res) => {
  Promo.find({ promocode: req.body.promocode }).exec((error, promo) => {
    if (promo.length) {
      return res.status(400).json({
        error: "PromoCode Already Exist!",
      });
    } else {
      const promocode = new Promo(req.body);
      promocode.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          res.json({ data });
        }
      });
    }
  });
};

exports.read = (req, res) => {
  Promo.find()
    .sort("-createdAt")
    .exec((err, promocodes) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(promocodes);
      }
    });
};

exports.singlePromoCode = (req, res) => {
  Promo.findOne({ promocode: req.query.promocode  })
    .exec((err, promocode) => {
      if (err || !promocode) {
        return res.status(400).json({
          error: "Invalid PromoCode!",
        });
      } else {
        res.json(promocode);
      }
    });
};

exports.promoById = (req, res, next, id) => {
  Promo.findById(id).exec((err, promocode) => {
    if (err || !promocode) {
      return res.status(400).json({
        error: "Promocode not found",
      });
    } else {
      req.promocode = promocode;
    }
    next();
  });
};

exports.remove = (req, res) => {
  let promocode = req.promocode;
  promocode.remove((err, deletedPromo) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json({
        message: "PromoCode Removed Successfully",
      });
    }
  });
};

exports.update = (req, res) => {
  Promo.findOneAndUpdate(
    { _id: req.promocode._id },
    { $set: req.body },
    { new: true },
    (err, promocode) => {
      if (err) {
        return res.status(400).json({
          error: "PromoCode not updated",
        });
      } else {
        res.json(promocode);
      }
    }
  );
};

exports.search = (req, res) => {
  Promo.find({ promocode: { $regex: req.query.promocode, $options:'i' } }).exec(
    (error, promocodes) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(promocodes);
      }
    }
  );
};
