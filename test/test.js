cryptoConfig = {
    "algorithm": "aes256",
    "key": "9HhPYW9pFRrDyrx26OqZJgNYZQ4RfqiqnzDOLS1lMQVtSc1HQEZr"
};
// secret.jwtKey = SECRET_JWTKEY=yT7#49)ouTSXxOsAuxnm
// PASSWORD_EXPIRED=28800 #8 hours
console.log(cryptoConfig);
var crypto = require('../global/utilCrypto');
var jwtAuth = require('../global/utilAuthenticate')
jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3NDFmZmRhOWU3YWJiYmZhMGQ3YTE3NmJiMzY1NzdmIiwicHciOiI4NjcwODE2OTE4ZWMxMWU1Njg0NzkwYzJkNjRlODA2MSIsImlhdCI6MTUzMjkzMDA5OCwiZXhwIjoxNTMyOTU4ODk4fQ.1LRVLfEWpddphbETjxOBcOE1TTTX-q738u3CkLZh4cQ'
jwtKey = 'yT7#49)ouTSXxOsAuxnm';
console.log(jwtAuth.jwtVerifier(jwt, jwtKey));
console.log(crypto.deCrypto(jwtAuth.jwtVerifier(jwt, jwtKey),cryptoConfig));
// var eJwt = crypto.enCrypto({
//     firstName: 'Todd',
//     lastName: 'Swint',
//     email: 'test.a@pwc.com',
//     uGuid: '65b9d5b0-4d57-11e6-8ed1-990273c9bb00',
// }, cryptoConfig);
// console.log(eJwt);
// console.log(crypto.deCrypto(eJwt, cryptoConfig));