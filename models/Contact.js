const mongoose = require('mongoose');
const { type } = require('os');

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);