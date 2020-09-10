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
mongoose.connect('mongodb+srv://mrafgaming:mfaisalghozi300599@cluster0.a6fw4.mongodb.net/mrafcommand_website_db?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected To Database !'))
    .catch(error => console.log(error.message));


//ROUTER FILE
var articleRoute = require('./routes/article');
var mainRoute = require('./routes/main');
var podcastRoute = require('./routes/podcast');

//MODEL FILE
var Article = require('./models/article');
var Podcast = require('./models/podcast');
var Comment = require('./models/comment');
var User = require('./models/user');

//PASSPORT AUTH CONFIG
app.use(require('express-session')({
    secret: 'this is secret msg',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


//APP CONFIG
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('views'));
app.set('view engine', 'ejs');

//ROUTER CONFIG
app.use(articleRoute);
app.use(mainRoute);
app.use(podcastRoute);


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


//=====
//ROUTE PODCAST
//=====


//=====
//ROUTE FOR MAIN CONFIG
//=====


//CREATING CONNECTION
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('MrafCommand Website Server Is Running !');
});