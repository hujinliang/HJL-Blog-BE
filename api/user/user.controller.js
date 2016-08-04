/**
 * Created by jialao on 2016/7/13.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Logs = mongoose.model('Logs');

var config = require('../../config/env');

//normal
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



//admin
exports.getUserList = function(req,res,next){
    
    User.findAsync({})
        .then(function(userlist){
            return res.status(200).json({data:userlist})
        }).catch(function(err){
        return next(err)
    })
}

exports.addUser = function(req,res,next){
    var nickname = req.body.nickname?req.body.nickname.replace(/(^\s+)|(\s+$)/g, ""):'';
    var email = req.body.email?req.body.email.replace(/(^\s+)|(\s+$)/g, ""):'';
    var NICKNAME_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
    var EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    var error_msg;
    if(nickname === ''){
        error_msg = "呢称不能为空";
    }else if(email === ''){
        error_msg = "邮箱地址不能为空";
    }else if(nickname.length <= 2 || nickname.length >15 || !NICKNAME_REGEXP.test(nickname)){
        //不符合呢称规定.
        error_msg = "呢称不合法";
    }else if(email.length <=4 || email.length > 30 || !EMAIL_REGEXP.test(email)){
        error_msg = "邮箱地址不合法";
    }
    if(error_msg){
        return res.status(422).send({error_msg:error_msg});
    }
    
    var newUser = new User(req.body);
    
    newUser.saveAsync()
        .then(function(user){
            return res.status(200).json({data:user})
        })
        .catch(function(err){
            return res.status(403).json({msg:'添加失败'})
        })
    
}

exports.destroy = function(req,res,next){
    var userId = req.user._id;
    if(String(userId) == req.params.id){
        return res.status(403).send({message:'不能删除已登录账号'})
    }
    User.findByIdAndRemoveAsync(req.params.id)
        .then(function(user){
            return res.status(200).send({success:true});
        })
}


