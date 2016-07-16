/**
 * Created by jialao on 2016/7/15.
 */
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var router = express.Router();
var User = mongoose.model('User');

router.post('/',function(req,res,next){
    var error_msg;
    if(req.body.email === '' || req.body.password === ''){
        error_msg = '用户名和密码不能为空';
        return res.status(400).send({error_msg:error_msg});
    }else{
        next();
    }
},function(req,res,next){
    passport.authenticate('local',function(err,user,info){
        if(err){
            next(err);
        }
        if(info){
            return res.status(402).send(info);
        }
        
        var token = auth.signToken(user._id);
        return res.json({token:token});
    })(req,res,next)
});

module.exports = router;