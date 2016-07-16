/**
 * Created by jialao on 2016/7/15.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function(User,config){
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },function(email,password,done){
        User.findOne({email:email.toLowerCase()},function(err,user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null,false,{error_msg:'用户名密码错误'})
            }
            if(!user.authenticate(password)){
                return done(null,false,{error_msg:'用户名密码错误'})
            }
            return done(null,user);
        })
    }))
}