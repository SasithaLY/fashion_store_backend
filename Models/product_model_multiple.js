const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const picSchema = new Schema({
    productName: {required: true, type: String},

    image: [{
        data: Buffer,
        contentType: String
    }]

}, {
    timestamps: true
});

const Pic = mongoose.model('Products', picSchema);

module.exports = Pic;