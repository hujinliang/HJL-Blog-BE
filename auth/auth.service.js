/**
 * Created by jialao on 2016/7/12.
 */

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/env');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = mongoose.model('User');

function authToken(credentialsRequired){
    return compose()
        .use(function(req,res,next){
            if(req.query&&req.query.hasOwnProperty('access_token')){
                req.header.authorization = 'Bearer ' + req.query.access_token;
            }
            next();
        })
        .use(expressJwt({
            secret:config.session.secrets,
            credentialsRequired:credentialsRequired
        }))
}

function isAuthenticated(){
    return compose()
        .use(authToken(true))
        .use(function(err,req,res,next){
            if(err.name === 'UnauthorizedError'){
                return res.status(401).send();
            }
            next();
        })
        .use(function(req,res,next){
            User.findById(req.user._id,function(err,user){
                if(err) return res.status(500).send();
                if(!user){
                    console.log('wtf');
                }
                req.user = user;
                next();
            })
        })
}

function hasRole(roleRequired){
    if(!roleRequired) throw new Error('needs Required');

    return compose()
        .use(isAuthenticated())
        .use(function(req,res,next){
            if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)){
                next();
            }else{
                return res.status(403).send()
            }
        })
}

function signToken(id){
    return jwt.sign({_id:id},config.session.secrets,{expiresIn:'1y'});
}

function snsPassport(){
    return compose()
        .use(authToken(false))
        .use(function(req,res,next){
            req.session.passport = {
                redirectUrl:req.query.redirectUrl || '/'
            };
            if(req.user){
                req.session.passport.userId = req.user._id;
            }
            next();
        })
}


exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.snsPassport = snsPassport;