const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    image:{type: Object},
    name: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [ItemSchema],
    transactionId: {},
    paymentMethod:{type:String},
    amount: { type: Number },
    shippingAddress: {type: Object},
    billingAddress: {type:Object},
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] 
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, Item };