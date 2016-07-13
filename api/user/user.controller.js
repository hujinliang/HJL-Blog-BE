/**
 * Created by jialao on 2016/7/13.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Logs = mongoose.model('Logs');

var config = require('../../config/env');

exports.getMe = function(req,res){
    var userId = req.user._id;
    User.findByIdAsync(userId).then(function(user){
        return res.status(200).json(user.userInfo)
    }).catch(function(err){
        return res.status(401).send()
    })
};

exports.getUserProvider = function(req,res,next){
    User.findByIdAsync(req.user._id).then(function(user){
        return res.status(200).json({data:user.providerInfo});
    }).catch(function(err){
        return next(err);
    })
};

exports.getSnsLogins = function(req,res,next){
    if(config.snsLogins){
        return res.status(200).json({
            success:true,
            data:config.snsLogins
        })
    }else{
        return res.status(200).send()
    }
};

exports.mdUser = function(req,res,next){
    var nickname = req.body.nickname?req.body.nickname.replace(/(^\s+)|(\s+$)/g,''):'';
    var NICKNAME_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;

    var error_msg;
    if(nickname === ''){
        err_msg = '昵称不能为空';
    }else if(nickname.length <= 2 || nickname.length >= 15 || !NICKNAME_REGEXP.test(nickname)){
        error.msg = '昵称不合法';
    }
    if(error_msg){
        return res.status(422).send({error_msg:error_msg});
    }
    
    var user = req.user;
    user.nickname = nickname;
    user.saveAsync().then(function(result){
        return res.status(200).json({
            success:true,
            data:result.userInfo
        })
    }).catch(function(err){
        res.status(500).send(err)
    })
};