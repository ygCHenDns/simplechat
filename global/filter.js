var express = require('express');
var jwtUtil = require('../global/utilAuthenticate');
var crypto = require('../global/utilCrypto');

module.exports = function(req, res, next){
    var jwt = req.cookies.jwt;
    var reqUrl = req.originalUrl;
    var user = new Array();
    //有jwt时，验证是不是合法的jwt
    if(jwt != "null" && jwt){
        user = jwtUtil.jwtVerifier(jwt);
        if(!user)
            return res.redirect('/login');
        else
            req.user = user;
    }

    //首页重定向到login
    if(reqUrl == '/'){
        return res.redirect('/login');
    }

    //没登陆跳转到登陆页面
    if(!(reqUrl == '/login' || reqUrl == '/authenticate') && !jwt){
        return res.redirect('/login');
    }
    next();
}