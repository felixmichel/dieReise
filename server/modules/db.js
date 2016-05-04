var mongoose = require('mongoose');

//connect to database
var url = 'mongodb://localhost:27017/dieReise';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

module.exports = db;