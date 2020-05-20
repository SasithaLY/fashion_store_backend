const { Order, Item } = require("../Models/Order");
const { errorHandler } = require("../Helpers/dbErrorHandler");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

exports.create = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fstoreaf@gmail.com",
        pass: "AFproject2020",
      },
    });

    let mailOptions = {
      from: "noreply@fashionstore.com",
      to: "fstoreaf@gmail.com",
      subject: "New Order Received",
      html: `
      <center>
      <h1>Hey, Someone Just Made a Purchase...</h1>
      </center>
      </br>
      <div style="height:50%">
      <div style="float:left; width:40%;">
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Customer name:</strong> ${order.user.fName + " " + order.user.lName}</p>
      <p><strong>Customer Email:</strong> ${order.user.email}</p>
      <p><strong>Transaction ID:</strong> ${order.transactionId}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      </div>
      <div style="float:right; width:30%;">
      <h3><strong>Shipping Address:</strong></h3>
      <ul style="list-style-type: none;">
      <li>${order.shippingAddress.firstName + " " + order.shippingAddress.lastName}</li>
      <li>${order.shippingAddress.address1}</li>
      <li>${order.shippingAddress.address2}</li>
      <li>${order.shippingAddress.city + " " + order.shippingAddress.postal}</li>
      <li>${order.shippingAddress.state}</li>
      <li>${order.shippingAddress.country}</li>
      </ul>
      </div>
      <div style="float:right; width:30%;">
      <h3><strong>Billing Address:</strong></h3>
      <ul style="list-style-type: none;">
      <li>${order.billingAddress.firstName + " " + order.billingAddress.lastName}</li>
      <li>${order.billingAddress.address1}</li>
      <li>${order.billingAddress.address2}</li>
      <li>${order.billingAddress.city + " " + order.billingAddress.postal}</li>
      <li>${order.billingAddress.state}</li>
      <li>${order.billingAddress.country}</li>
      </ul>
      </div>
      </div>
      <div style="height:50%">
      <h2><strong>Product details:</strong></h2>
            <hr />
            <table class="table">
            <thead>
              <tr>
                <th style="padding-right:20px; text-align:center; width:20%;">Product</th>
                <th style="padding-right:20px; text-align:center; width:20%;">Price</th>
                <th style="padding-right:20px; text-align:center; width:20%;">Quantity</th>
              </tr>
            </thead>
            <tbody>
            ${order.products.map((p) => {
              return `<tr>
                        <td style="padding-right:20px; text-align:center; width:20%;">${p.name}</td>
                        <td style="padding-right:20px; text-align:center; width:20%;">USD ${parseFloat(p.price).toFixed(2)}</td>
                        <td style="padding-right:20px; text-align:center; width:20%;">${p.count}</td>
                </tr>`;
            })}
            </tbody>
            </table>
            <hr />
            <h3><strong>Shipping Cost:</strong> USD ${parseFloat(order.shipping.shipping).toFixed(2)}<h3>
            <h3><strong>Discount:</strong> ${parseFloat(order.promocode.discount)}%<h3>
            <h2><strong>Total Order Cost:</strong> USD ${parseFloat(order.amount).toFixed(2)}<h2>
            </div>
  `,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Email Send Failed!", err);
      } else {
        console.log("Email Sent!");
      }
    });

    let mailOptions2 = {
      from: "noreply@fashionstore.com",
      to: order.user.email,
      subject: "Your FashionStore Order Receipt",
      html: `
      <center>
      <h1 style="font-size: 32px;">Thank You.</h1>
      <h3>Hi, ${order.user.fName + " " + order.user.lName}</h3>
      <span>Thanks for your purchase from Fashion Store.</span> 
      </br>
      <h1>Order ID: ${order._id}</h1>
      <span style="font-size:14px;color:#b2b2b2;">(Please keep a copy of this receipt for your records.)</span>
      </center>
      </br>
      <div style="height:50%">
      <div style="float:left; width:40%;">
      <p><strong>Name:</strong> ${order.user.fName + " " + order.user.lName}</p>
      <p><strong>Email:</strong> ${order.user.email}</p>
      <p><strong>Transaction ID:</strong> ${order.transactionId}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p><strong>Order Status:</strong> ${order.status}</p>
      </div>
      <div style="float:right; width:30%;">
      <h3><strong>Shipping Address:</strong></h3>
      <ul style="list-style-type: none;">
      <li>${order.shippingAddress.firstName + " " + order.shippingAddress.lastName}</li>
      <li>${order.shippingAddress.address1}</li>
      <li>${order.shippingAddress.address2}</li>
      <li>${order.shippingAddress.city + " " + order.shippingAddress.postal}</li>
      <li>${order.shippingAddress.state}</li>
      <li>${order.shippingAddress.country}</li>
      </ul>
      </div>
      <div style="float:right; width:30%;">
      <h3><strong>Billing Address:</strong></h3>
      <ul style="list-style-type: none;">
      <li>${order.billingAddress.firstName + " " + order.billingAddress.lastName}</li>
      <li>${order.billingAddress.address1}</li>
      <li>${order.billingAddress.address2}</li>
      <li>${order.billingAddress.city + " " + order.billingAddress.postal}</li>
      <li>${order.billingAddress.state}</li>
      <li>${order.billingAddress.country}</li>
      </ul>
      </div>
      </div>
      <div style="height:50%">
      <h2><strong>Product details:</strong></h2>
            <hr />
            <table class="table">
            <thead>
              <tr>
                <th style="padding-right:20px; text-align:center; width:20%;">Product</th>
                <th style="padding-right:20px; text-align:center; width:20%;">Price</th>
                <th style="padding-right:20px; text-align:center; width:20%;">Quantity</th>
              </tr>
            </thead>
            <tbody>
            ${order.products.map((p) => {
              return `<tr>
                        <td style="padding-right:20px; text-align:center; width:20%;">${p.name}</td>
                        <td style="padding-right:20px; text-align:center; width:20%;">USD ${parseFloat(p.price).toFixed(2)}</td>
                        <td style="padding-right:20px; text-align:center; width:20%;">${p.count}</td>
                </tr>`;
            })}
            </tbody>
            </table>
            <hr />
            <h3><strong>Shipping Cost:</strong> USD ${parseFloat(order.shipping.shipping).toFixed(2)}<h3>
            <h3><strong>Discount:</strong> ${parseFloat(order.promocode.discount)}%<h3>
            <h2><strong>Total Order Cost:</strong> USD ${parseFloat(order.amount).toFixed(2)}<h2>
            </div>
  `,
    };

    transporter.sendMail(mailOptions2, function (err, data) {
      if (err) {
        console.log("Email Send Failed!", err);
      } else {
        console.log("Email Sent!");
      }
    });
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
  Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(order);
  });
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
      products: { $elemMatch: { name: { $regex: req.query.product, $options: "i" } } },
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

  if (query.length == 0) {
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
  } else {
    Order.find({ $and: query })
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
      products: { $elemMatch: { name: { $regex: req.query.product, $options: "i" } } },
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
