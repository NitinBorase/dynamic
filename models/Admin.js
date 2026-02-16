const moongose = require('mongoose');

const adminSchema = new moongose.Schema({
    username: String,
    password: String
});

module.exports = moongose.model('Admin', adminSchema);