const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// HOME
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express', });
});

// USER AUTHENTICATION

// router.get('/register', function(req, res){
// 	res.render('register', { title: 'register' });
// });

// router.post('/register', function(req, res, next){
// 	User.register(new User({ username: req.body.username }), req.body.password, function(err){
// 		if(err) return next(err);
// 	});
// 	res.redirect('/success');
// });

// router.get('/success', function(req, res){
// 	res.send('Success!');
// });

// router.get('/login', function(req, res){
// 	res.render('login', { title: 'login' });
// });

// router.post('/login', passport.authenticate('local'), function(req, res){
// 	res.redirect('/');
// });

// router.get('/logout', function(req, res){
// 	req.logout();
// 	res.redirect('/');
// });

module.exports = router;
