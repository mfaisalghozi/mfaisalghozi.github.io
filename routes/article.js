var express = require('express');
var router = express.Router();

//FILE REQUIREMENT
var Article = require('../models/article');

router.get('/article', function (req, res) {
    Article.find({}, function (err, article) {
        if (err) console.log(err);
        else res.render('article', {
            data: article
        });
    });
});

router.get('/article/new', function (req, res) {
    res.render('articleNew');
});

router.post('/article', function (req, res) {
    var d = new Date();
    var newArticle = new Article({
        name: req.body.title,
        image: req.body.image,
        text: req.body.content,
        date: d.toDateString(),
        category: req.body.category
    })

    newArticle.save(function (err) {
        if (err) console.log(err);
        else console.log('New Article has been published !');
    })

    res.redirect('/article');
});

router.get('/article/:id', function (req, res) {
    var id = req.params.id;
    Article.findById(id, function (err, found) {
        if (err) console.log(err);
        else {
            res.render('article_show', {
                article: found
            });
        }
    });
});

router.get('/article/:id/edit', function (req, res) {
    Article.findById(req.params.id, function (err, found) {
        res.render('articleUpdate', {
            article: found
        })
    })
});

router.put('/article/:id', function (req, res) {
    Article.findByIdAndUpdate(req.params.id, req.body.article, function (err, found) {
        if (err) {
            console.log(err)
        } else {
            console.log('Update Success !');
            res.redirect('/article/' + req.params.id);
        }
    })
})

router.delete('/article/:id', function (req, res) {
    Article.findByIdAndRemove(req.params.id, function (err, article) {
        if (err) res.redirect('/');
        else {
            console.log("Success Delete An Article !");
            res.redirect('/article');
        }
    })
});

module.exports = router;