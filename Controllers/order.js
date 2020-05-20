const { Order, Item } = require("../Models/Order");
const { errorHandler } = require("../Helpers/dbErrorHandler");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  console.log("create order:", req.body);

  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.getOrders = (req, res) => {
  Order.find()
    .populate("user", "_id, fName , lName , email")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};

exports.getStates = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};

exports.getOrdersHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id, fName , lName , email")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};

exports.searchOrders = (req, res) => {
  const query = [];

  if (req.query.orderId && req.query.orderId.length != 0) {
    if (!mongoose.Types.ObjectId.isValid(req.query.orderId)) {
        return res.json([]);
    } else {
      query.push({ _id: mongoose.Types.ObjectId(req.query.orderId) });
    }
  }
  if (req.query.product && req.query.product.length != 0) {
    query.push({
      products: { $elemMatch: { name: { $regex: req.query.product, $options:'i' } } },
    });
  }

  if (req.query.from && req.query.to) {
    var toDate = new Date(req.query.to);
    toDate.setDate(toDate.getDate() + 1);
    query.push({
      createdAt: {
        $lte: toDate,
        $gte: new Date(req.query.from),
      },
    });
  }
  
  if(query.length==0){
    Order.find()
    .populate("user", "_id, fName , lName , email")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
  }else{
    Order.find({$and: query})
    .populate("user", "_id, fName , lName , email")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
  }
  
};

exports.searchUserOrders = (req, res) => {
  const query = [];

  query.push({ user: req.profile._id });

  if (req.query.orderId) {
    if (!mongoose.Types.ObjectId.isValid(req.query.orderId)) {
        return res.json([]);
    } else {
      query.push({ _id: mongoose.Types.ObjectId(req.query.orderId) });
    }
  }
  if (req.query.product) {
    query.push({
      products: { $elemMatch: { name: { $regex: req.query.product, $options:'i' } } },
    });
  }

  if (req.query.from && req.query.to) {
    var toDate = new Date(req.query.to);
    toDate.setDate(toDate.getDate() + 1);
    query.push({
      createdAt: {
        $lte: toDate,
        $gte: new Date(req.query.from),
      },
    });
  }

  Order.find({ $and: query })
    .populate("user", "_id, fName , lName , email")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(orders);
      }
    });
};
