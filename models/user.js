var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
      email: String,
      password: String,
      name: String,
      description: String
   }
);


userSchema.pre('save', function next () {
   var user = this;

   if (!user.isModified('password'))
      return next();

   bcrypt.hash(user.password, null, null, (err, hash) => {
      if (err) return next();
      user.password = hash;
      console.log(hash);
   })
});

module.exports = mongoose.model('User', userSchema);