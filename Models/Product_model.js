const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {required: true, type: String}
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;