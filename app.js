var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose setup
var mongoDB = 'mongodb://localhost/jabibuland';
mongoose.connect(mongoDB);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
if (process.env.NODE_ENV != 'production'){
  db.once('open', function(){
    console.log('CONNECTED to MongoDB');
  });
}

// passport setup
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({ username: username }, function(err, user){
      if(err){ return done(err); }
      if(!user){ return done(null, false, { message: 'Incorrect username.' }); }
      if(!user.validPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
      return done(null, user);
    });
  }
));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
