var express = require('express');
var router = express.Router();
var passport = require('passport');

//FILE REQ
var User = require('../models/user');


router.get('/', function (req, res) {
    res.render('home');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    var newUser = new User({
        username: req.body.username
    })
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err.message);
            return res.render('register');
        }
        console.log('New Acc has been created !');
        res.redirect('/');
    })
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), function (req, res) {
    console.log('Login as ' + req.user.username);
    res.redirect('/');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;