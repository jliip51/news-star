var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/test', { useMongoClient: true,});
// mongodb://heroku_l9j4qtbw:49o85s63f3bjaej60r28gptv68@ds133084.mlab.com:33084/heroku_l9j4qtbw
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database');
});

module.exports = db;
