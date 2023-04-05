const mongoose = require('mongoose')

var Vendor = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Vendor', Vendor)