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
//API TESTING 
//=====
app.get('/testingApi', function (req, res) {
    //ERROR STATUS CODE 401 (UNAUTORIZED)
    var url = 'https://api.spotify.com/v1/shows/{id}/episodes';
    axios.get(url)
        .then(function (response) {
            if (response.status == 200) {
                var body = response.data;
                console.log(body);
            }
        })
});


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

app.get('/article/:id', function (req, res) {
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

app.get('/article/:id/edit', function (req, res) {
    Article.findById(req.params.id, function (err, found) {
        res.render('articleUpdate', {
            article: found
        })
    })
});

app.put('/article/:id', function (req, res) {
    Article.findByIdAndUpdate(req.params.id, req.body.article, function (err, found) {
        if (err) {
            console.log(err)
        } else {
            console.log('Update Success !');
            res.redirect('/article/' + req.params.id);
        }
    })
})

app.delete('/article/:id', function (req, res) {
    Article.findByIdAndRemove(req.params.id, function (err, article) {
        if (err) res.redirect('/');
        else {
            console.log("Success Delete An Article !");
            res.redirect('/article');
        }
    })
});

//=====
//ROUTE PODCAST
//=====
app.get('/podcast', function (req, res) {
    Podcast.find({}, function (err, podcast) {
        if (err) console.log(err);
        else res.render('podcast', {
            data: podcast
        })
    })
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