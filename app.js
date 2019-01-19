const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const app = express();

// require models
const User = require('./models/User');

// require routes
const index = require('./routes/index');
const character = require('./routes/character');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose setup
const mongoDB = 'mongodb://localhost:27017/jabibuland';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  autoReconnect: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
if (process.env.NODE_ENV != 'production'){
  db.once('open', function(){
    console.log('CONNECTED to MongoDB');
  });
}

// passport setup https://github.com/saintedlama/passport-local-mongoose
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false }
));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// local variables
app.use(function(req, res, next){
  res.locals.currentUser = req.user;

  next();
});

app.use('/', index);
app.use('/character/', character);

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
