/**
 * Created by jialao on 2016/7/12.
 */
var mongoose = require('mongoose');
var User = require('../model/user');

if(process.env.NODE_ENV === 'development'){
    User.countAsync().then(function(count){
        if(count === 0){
            User.removeAsync().then(function(){
                User.createAsync({
                    nickname:'admin',
                    email:'admin@admin.com',
                    password:'admin'
                },{
                    nickname:'test1',
                    email:'aa@qq.com',
                    password:'test1'
                })
            })
        }
    })
}