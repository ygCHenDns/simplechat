var express = require('express');
var authenticate = require('../global/utilAuthenticate').authenticate;
var router = express.Router();

router.post('/', function(req, res, next){
    res.send(authenticate(req));
});

module.exports = router;