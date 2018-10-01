var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local',{
  successRedirect: '/success',
  failureRedirect: '/',
  failureFlash: true
})
);

router.get('/success', function(req, res){
  res.send('Success!');
});

module.exports = router;
