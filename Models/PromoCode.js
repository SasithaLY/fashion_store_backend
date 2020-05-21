const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema({
    promocode: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    discount: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Promo", promoSchema);