var User = require('./models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var express = require('express');
var router = express.Router();


router.post( '/register', (req, res) => {
   UserData = req.body;
   var user = new User(UserData);
   user.save((err, newUser) =>
       {
          if (err)
             res.status(500).send({message: "Error saving user"});

          createSendToken(res, newUser);
       });
});


router.post('/login', async (req, res) => {
   loginData = req.body;

   var user = await User.findOne({email: loginData.email});

   if(!user)
      return res.status(401).send({message: "Email or password is invalid"});

   bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
      if (!isMatch)
         return res.status(401).send({message: "Email or password is invalid"});

   });
   createSendToken(res, user);
});

function createSendToken(res, user)
{
   var payload = { subject: user._id};

   var token = jwt.encode(payload, '1234');

   res.status(200).send({token: token});
}

var auth = {
   router,
   checkAuthenticated: (req, res, next) => {
      if(!req.header('authorization'))
         return res.status(401).send({message: 'Unauthorized. Missing Auth Header'});

      var token;
      token = req.header('authorization').split(' ')[1];

      var payload = jwt.decode(token, '1234');

      if(!payload)
         return res.status(401).send({message: 'Unauthorized. Auth Header Invalid'});

      req.userId = payload.subject;

      next()
   }
};
module.exports = auth;