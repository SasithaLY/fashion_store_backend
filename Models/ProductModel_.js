const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        quantity: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0,
            required: false
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
            required: false,
            type: Boolean
        },
        oldPrice: {
            type: Number,
            trim: true,
            required: false,
            maxlength: 32
        },
        storeMgrID: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        review: [
            {
                rating: {
                    type: Number,
                    required: false
                },
                subject: {
                    type: String,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
