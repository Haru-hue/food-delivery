const mongoose  = require('mongoose');

var Food = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: {
        filename: String,
        url: String
    },
    meta: {
        ratingsCount: Number,
        reviewsCount: Number
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Food', Food);