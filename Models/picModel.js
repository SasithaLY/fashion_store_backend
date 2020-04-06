const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const picSchema = new Schema({
    image:
        {data: Buffer, contentType: String}
},{
    timestamps: true
});

const Pic = mongoose.model('Pic', picSchema);

module.exports = Pic;