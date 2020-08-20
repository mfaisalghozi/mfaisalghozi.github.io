var express = require('express');
var app = express();
const axios = require('axios');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
var flash = require('connect-flash');


//AUTH NPM
var passport = require('passport');
var localStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

//DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/mrafcommand_website_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected To Database !'))
    .catch(error => console.log(error.message));


//MODEL FILE
var Article = require('./models/article');
var Podcast = require('./models/podcast');

//APP CONFIG
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('views'));
app.set('view engine', 'ejs');

//=====
//ROUTE ARTICLE
//=====
app.get('/article', function (req, res) {
    Article.find({}, function (err, article) {
        if (err) console.log(err);
        else res.render('article', {
            data: article
        });
    });
});

app.get('/article/new', function (req, res) {
    res.render('articleNew');
});

app.post('/article', function (req, res) {
    var d = new Date();
    var newArticle = new Article({
        name: String,
        image: String,
        Text: String,
        Date: d.toString(),
        Category: String
    })

    newArticle.save(function (err) {
        if (err) console.log(err);
        else console.log('New Article has been published !');
    })

    res.redirect('/article');
});

app.get('/article/:id', function (req, res) {
    var id = req.params.id;
    res.render('article_show');
});

app.get('/article/:id/edit', function (req, res) {

});

app.get('/article/:id/delete', function (req, res) {

});

//=====
//ROUTE PODCAST
//=====
app.get('/podcast', function (req, res) {
    res.render('podcast');
});

app.get('/podcast/new', function (req, res) {
    res.render('podcastNew');
});

app.post('/podcast', function (req, res) {
    var newPodcast = new Podcast({
        podcastUrl: String
    });

    newPodcast.save(function (err) {
        if (err) console.log(err);
        else console.log('New Podcast is Release !');
    })

    res.redirect('/podcast');
})

//=====
//ROUTE FOR MAIN CONFIG
//=====
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/register', function (req, res) {
    res.render('register');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/logout', function (req, res) {});

//CREATING CONNECTION
app.listen('3000', function () {
    console.log('MrafCommand Website Server Is Running !');
});