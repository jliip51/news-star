var mongoose = require('mongoose');

mongoose.Promise = Promise;

// mongoose.connect('mongodb://localhost/test', { useMongoClient: true,});
mongoose.connect('mongodb://heroku_l9j4qtbw:49o85s63f3bjaej60r28gptv68@ds133084.mlab.com:33084/heroku_l9j4qtbw', { useMongoClient: true,});

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to database');
});

module.exports = db;
