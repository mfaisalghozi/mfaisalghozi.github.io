var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    name: String,
    image: String,
    text: String,
    date: String,
    category: String
});

module.exports = mongoose.model("Article", articleSchema);