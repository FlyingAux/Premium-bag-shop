const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/premiumBag');

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    gstin: String,
    picture: String
})

module.exports = mongoose.model('owner',ownerSchema);