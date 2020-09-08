var express = require('express');
var router = express.Router();

//FILE REQ
var Podcast = require('../models/podcast');

router.get('/podcast', function (req, res) {
    Podcast.find({}, function (err, podcast) {
        if (err) console.log(err);
        else res.render('podcast', {
            data: podcast
        })
    })
});

router.get('/podcast/new', function (req, res) {
    res.render('podcastNew');
});

router.post('/podcast', function (req, res) {
    var newPodcast = new Podcast({
        podcastUrl: String
    });

    newPodcast.save(function (err) {
        if (err) console.log(err);
        else console.log('New Podcast is Release !');
    })

    res.redirect('/podcast');
})

module.exports = router;