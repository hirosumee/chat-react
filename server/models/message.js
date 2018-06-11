var mongoose = require('mongoose');
var Schema = new mongoose.Schema ({
    text:String,
    timestamp:Date,
    sender: {type:mongoose.Schema.Types.ObjectId,ref:'users'}
});
var message = mongoose.model('messages',Schema);
module.exports = message;