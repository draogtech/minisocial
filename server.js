var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./auth');
var app = express();

var User = require('./models/user');
var Post = require('./models/post');

mongoose.Promise = Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/posts/:id', async (req, res) => {
   var author = req.params.id;
   var posts = await Post.find({author});
   res.send(posts);
});

app.post('/post', auth.checkAuthenticated, (req, res) => {
   var postData = req.body;
   postData.author = req.userId;
   var post = new Post(postData);
   post.save().then(
      (success) => {
         console.log('post saved');
         res.sendStatus(200);
      },
      (failure) => {
         console.error('failure in post');
      }
   );
});

app.get('/users', async (req, res) => {
   try {
      console.log(req.userId);
      var users = await User.find({}, '-password -__v');
      res.send(users)
   } catch (error){
      res.sendStatus(500)
   }


});

app.get('/profile/:id', async (req, res) => {
   try {
      var user = await User.findById(req.params.id, '-password -__v');
      res.send(user)
   } catch (error){
      res.sendStatus(500)
   }

});


mongoose.connect('mongodb://draogtech:masterdare12@ds253840.mlab.com:53840/minisocial', (err) => {
   if(!err){
      console.log('connected to mongo');
   }
   else {
      console.log('Cannot connect to database');
   }
});

app.use('/auth', auth.router);
app.listen(process.env.PORT || 3000);