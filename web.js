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

//APP CONFIG
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('views'));
app.set('view engine', 'ejs');


//ALL ROUTE GOING TO MAIN,ARTICLE,PODCAST PAGE
app.get('/', function (req, res) {
    res.render('home');
})

app.get('/article', function (req, res) {
    res.render('article');
})

app.get('/article/:id', function (req, res) {
    var id = req.params.id;
    res.render('article_show');
})

app.get('/podcast', function (req, res) {
    res.render('podcast');
})

//ROUTE ARTICLE ADD-EDIT-DELETE


//ROUTE FOR REGISTERING-LOGIN



//


//CREATING CONNECTION
app.listen('3000', function () {
    console.log('MrafCommand Website Server Is Running !');
})