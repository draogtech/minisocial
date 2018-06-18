var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
       message: String,
       author: {type: mongoose.Schema.Types.ObjectId, _isRef: 'User'}

});

module.exports = mongoose.model('Post', postSchema);