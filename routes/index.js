var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect('/login');
  next();
});

router.get('/login', function(req, res, next){
  res.render('index');
});

router.get('/home', function(req, res, next){
  var re = req;
  res.render('home');
});

router.get('/chat', function(req, res){
  res.render('chat');
})

module.exports = router;
