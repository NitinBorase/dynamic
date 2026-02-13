const mongoose = require('mongoose');

const connectSchema = new mongoose.Schema({
    email: String,
    phone: String,
    address: String,
    website: String
});

module.exports = mongoose.model('Connect', connectSchema);