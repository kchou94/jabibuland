const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/jabibuland';
const Attribute = require('./models/Attribute');

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  autoReconnect: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection err:'));
db.once('open', () => {

    console.log('connected!')

    
});