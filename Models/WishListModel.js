const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const WishlistProductSchema = new mongoose.Schema(
    {
      product: { type: ObjectId, ref: "Product" },
      image:{type: Object},
      name: String,
      price: Number,
        
    },
    { timestamps: true }
  );
  
  const wishModel = mongoose.model("wishModel", WishlistProductSchema);

  const WishlistSchema = new mongoose.Schema(
    {
      products: {type: Object},
     
      updated: Date,
      user: { type: ObjectId, ref: "User" }
    },
    { timestamps: true }
  );
  
  const WishList = mongoose.model("WishList", WishlistSchema);
  
  module.exports = { WishList, wishModel };
  