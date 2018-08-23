var express = require('express');
var userDB = require('../global/users').userDb;
var base64 = require('js-base64').Base64;
var crypto = require('../global/utilCrypto');
var jwt = require('jsonwebtoken');

cryptoConfig = {
    "algorithm": "aes256",
    "key": "9HhPYW9pFRrDyrx26OqZJgNYZQ4RfqiqnzDOLS1lMQVtSc1HQEZr"
};

jwtKey = 'yT7#49)ouTSXxOsAuxnm';

var expires = 28800; //28800

module.exports.authenticate = function(req){
    //取值
    id = req.body.id;
    pw = base64.decode(req.body.pw);

    var token = null;
    //查询
    for(var i in userDB){
        if(userDB[i].id == id && userDB[i].pw == pw){
            console.log('Success');
            //第一遍加密对象
            var uJWT = crypto.enCrypto({
                'id':id,
                'pw':pw,
            },cryptoConfig);
        //第二遍加密jwt
        token = jwt.sign(uJWT, jwtKey, {expiresIn: expires});
        break;
        }
    }
    var result = new Array();
    result = {
        'id': id,
        'jwt': token,
    };
    return result;
}

//解开jwt 返回对象
module.exports.jwtVerifier = function(trueJwt){
    try{
    //两遍解密
    var obj = jwt.verify(trueJwt, jwtKey);
    return crypto.deCrypto(obj, cryptoConfig);
    }catch(e){
        return null;
    }
}


