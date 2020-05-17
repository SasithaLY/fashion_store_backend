const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ModelSchema = new mongoose.Schema(
    {
      product: { type: ObjectId, ref: "Product" },
      name: String,
      price: Number,
      photo: String
      
    },
    { timestamps: true }
  );
  
  const wishModel = mongoose.model("wishModel", ModelSchema);

  const WishlistSchema = new mongoose.Schema(
    {
      products: [ModelSchema],
     
      updated: Date,
      user: { type: ObjectId, ref: "User" }
    },
    { timestamps: true }
  );
  
  const WishList = mongoose.model("WishList", WishlistSchema);
  
  module.exports = { WishList, wishModel };
  