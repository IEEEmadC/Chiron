// app/models/salt.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SaltSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Salt', SaltSchema);