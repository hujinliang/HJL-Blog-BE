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
    hashedPassword:String,
    salt:String,
    avatar:String
});

UserSchema
    .virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    }).get(function(){
        return this._password;
    })

UserSchema.methods = {
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