/**
 * Created by jialao on 2016/7/12.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var crypto = require('crypto')

var UserSchema = new Schema({
    nickname:String,
    provider:{
        type:String,
        default:'local'
    },
    email:{
        type:String,
        lowercase:true
    },
    qq:{
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    likeList:[
        {
            type:Schema.Types.ObjectId,
            ref:'Article'
        }
    ],
    hashedPassword:String,
    salt:String,
    avatar:String,
    role:{
        type:String,
        default:'user'
    },
    created:{
        type:Date,
        default:Date.now
    }
});

UserSchema
    .virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    }).get(function(){
    return this._password;
});

UserSchema
    .virtual('userInfo')
    .get(function(){
        return {
            'nickname':this.nickname,
            'role':this.role,
            'email':this.email,
            'avatar':this.avatar,
            'likes':this.likeList,
            'provider':this.provider
        };
    });

UserSchema.virtual('providerInfo')
    .get(function(){
       return {
           'qq':this.qq,
           'github':this.github
       }
    });
//
UserSchema
    .virtual('token')
    .get(function(){
        return {
            '_id':this._id,
            'role':this.role
        };
    });

UserSchema
    .path('nickname')
    .validate(function(value,respond){
       var self = this;
        this.constructor.findOne({nickname:value},function(err,user){
            if(err) throw err;
            if(user){
                if(self.id === user.id){
                    return respond(true);
                }
                respond(false);
            }
            respond(true)
        })
    },'这个呢称已经被使用');
//
UserSchema.methods = {
    hasRole:function(role){
      var selfRoles = this.role;
        return (selfRoles.indexOf('admin')!==-1||selfRoles.indexOf(role)!==-1);
    },
    makeSalt:function(){
        return crypto.randomBytes(16).toString('base64')
    },
    encryptPassword:function(password){
        if(!password || !this.salt){
            return '';
        }
        var salt = new Buffer(this.salt,'base64');
        return crypto.pbkdf2Sync(password,salt,1000,64).toString('base64');
    },
    authenticate:function(text){
        return this.encryptPassword(text)===this.hashedPassword;
    }

}

UserSchema.set('toObject', { virtuals: true });

var User = mongoose.model('User',UserSchema);
var Promise = require('bluebird');
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

module.exports = User;