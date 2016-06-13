var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var eventRouter = require('./routes/eventRouter');

// FIXME: Extract db stuff to module
// FIXME: use environment config files db-url
var url = 'mongodb://localhost:27017/dieReise';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");
});

var app = express();

// FIXME: Restrict to frontend server origins to be more secure
// FIXME: use environment config files for origins (NODE_ENV=production node app.js)
app.use(cors({
  origin: 'http://www.tradukt.ch'
 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes =========================================
app.use('/events',eventRouter);

// Error handler ==================================
require('./modules/errorHandler')(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port ' + this.address().port);
});
