const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const locationSchema = new mongoose.Schema({
    country: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    shipping: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);