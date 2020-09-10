var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    name: String,
    image: String,
    text: String,
    date: String,
    category: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model("Article", articleSchema);