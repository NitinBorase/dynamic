const moongoose = require('mongoose');

const featureSchema = new moongoose.Schema({
    featureSign: String,
    featureName: String,
    featureDescription: String
});

module.exports = moongoose.model('Feature', featureSchema);