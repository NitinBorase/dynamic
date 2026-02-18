const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    imageSrc: String,
    imgTitle: String,
    imgDesc: String
});

module.exports = mongoose.model('Gallery', gallerySchema);