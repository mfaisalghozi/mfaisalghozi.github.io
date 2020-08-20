var mongoose = require('mongoose');

var podcastScheme = new mongoose.Schema({
    podcastUrl: String
});

module.exports = mongoose.model('Podcast', podcastScheme);