const mongoose = require('mongoose')

var Category = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Category', Category, 'fcategories')