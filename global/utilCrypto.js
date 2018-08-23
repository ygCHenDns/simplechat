var crypto = require('crypto');
var hex = "hex";
var utf8 = "utf8";
//Crypto加密
//@param sourceJwtObj => any dict obj
//@param cryprConfig => {algorithm='',key=''}
module.exports.enCrypto = function(sourceJwtObj, cryptConfig){
    destJwtObj = {};
    try{
        // 将字典里所有的键值对按值加密
        for(var key in sourceJwtObj){
            var text = sourceJwtObj[key];
            if(typeof text === 'string'){
                var chiper = crypto.createCipher(cryptConfig.algorithm, cryptConfig.key);
                text = chiper.update(text, utf8, hex);
                text += chiper.final(hex);
            }
            destJwtObj[key] = text;
        }
        //返回加密后的对象
        return destJwtObj;
    }catch(e){
        console.log(e)
    }
    return null;
}

//enCrypto的逆过程
module.exports.deCrypto = function(sourceJwtObj, cryptConfig){
    destJwtObj = {};
    try{
        // 将字典里所有的键值对按值解密
        for(var key in sourceJwtObj){
            var text = sourceJwtObj[key];
            if(typeof text === 'string'){
                var chiper = crypto.createDecipher(cryptConfig.algorithm, cryptConfig.key);
                text = chiper.update(text, hex, utf8);
                text += chiper.final(utf8);
            }
            destJwtObj[key] = text;
        }
        //返回解密后的对象
        return destJwtObj;
    }catch(e){
        console.log(e)
    }
    return null;
}