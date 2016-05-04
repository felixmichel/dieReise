// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({
    firstName:  {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// create a schema
var eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
     image: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    registration:[registerSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Events = mongoose.model('Event', eventSchema);

// make this available to our Node applications
module.exports = Events;