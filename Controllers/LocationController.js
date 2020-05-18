const Location = require("../Models/Location");
const { errorHandler } = require("../Helpers/dbErrorHandler");

exports.create = (req, res) => {
  Location.find({ country: req.body.country }).exec((error, loc) => {
    if (loc.length) {
      return res.status(400).json({
        error: "Country Already Exist!",
      });
    } else {
      const location = new Location(req.body);
      location.save((err, data) => {
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
  Location.find()
    .sort("country")
    .exec((err, locations) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(locations);
      }
    });
};

exports.singleLocation = (req, res) => {
  Location.find({ _id: req.location._id }).exec((err, location) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json(location);
    }
  });
};

exports.locationById = (req, res, next, id) => {
  Location.findById(id).exec((err, location) => {
    if (err || !location) {
      return res.status(400).json({
        error: "Country not found",
      });
    } else {
      req.location = location;
    }
    next();
  });
};

exports.remove = (req, res) => {
  let location = req.location;
  location.remove((err, deletedLocation) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json({
        message: "Country Removed Successfully",
      });
    }
  });
};

exports.update = (req, res) => {
  Location.findOneAndUpdate(
    { _id: req.location._id },
    { $set: req.body },
    { new: true },
    (err, location) => {
      if (err) {
        return res.status(400).json({
          error: "Country not updated",
        });
      } else {
        res.json(location);
      }
    }
  );
};

exports.search = (req, res) => {
  Location.find({country: { $regex: req.query.country, $options: 'i' }}).exec((error, locations) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    } else {
      res.json(locations);
    }
  });
};
