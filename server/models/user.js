var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = new mongoose.Schema ({
    username:String,
    password:String
});
Schema.plugin(findOrCreate);
var user = mongoose.model('users',Schema);

module.exports = user;
