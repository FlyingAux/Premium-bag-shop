const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    gstin: String,
    picture: String,
    role: {
        type: String,
        enum: 'admin',
        default: 'admin'
    }
})

module.exports = mongoose.model('owner',ownerSchema);