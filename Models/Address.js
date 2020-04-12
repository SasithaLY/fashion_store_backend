const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//Create Schema
const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    address1: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    address2: {
        type: String,
        trim: true,
        required: false,
        maxlength: 32
    },
    city: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    country: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    state: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    postal: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    user:{type:ObjectId, ref:"User"}
  
},
{ timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);