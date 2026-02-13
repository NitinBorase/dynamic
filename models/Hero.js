const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    title: String,
    subtitle_one: String,
    subtitle_two: String
});

module.exports = mongoose.model('Hero', heroSchema);