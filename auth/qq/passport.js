/**
 * Created by jialao on 2016/7/15.
 */
var passport = require('passport');
var qqStrategy = require('passport-qq').Strategy;

exports.setup = function(User,config){
    passport.use(new qqStrategy({
            clientId:config.qq.clientID,
            clientSecret:config.qq.clientSecret,
            callbackURL:config.qq.callbackURL,
            passReqToCallback:true
        },
        function(req,accessToken,refreshToken,profile,done){
            var userId = req.session.passport.userId ||null;
            if(!userId){
                User.findOne({
                        'qq.id':profile.id
                    },function(err,user){
                        if(err){
                            done(err);
                        }
                        if(!user){
                            var newUser = {
                                nickname:profile._json.nickname||'',
                                avatar:profile._json.figureurl_qq_2||profile._json.figureurl_2||'',
                                provider:'qq',
                                qq:{
                                    id:profile.id,
                                    token:accessToken,
                                    name:profile._nickname||'',
                                    email:''
                                }
                            }
                            User.findOne({nickname:newUser.nickname},function(err,user){
                                if(err) return done(err);
                                if(user){
                                    newUser.nickname = tools.randomString();
                                }
                                user = new User(newUser);
                                user.save(function(err){
                                    if(err) return done(err);
                                    done(null,user);
                                })
                            })
                        }else{
                            return done(err,user);
                        }
                    }
                )
            }else{
                return done(new Error('以登录'))
            }
        }
    ))
}