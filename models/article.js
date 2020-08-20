var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    name: String,
    image: String,
    Text: String,
    Date: String,
    Category: String
});

module.exports = mongoose.model('Article', articleSchema);