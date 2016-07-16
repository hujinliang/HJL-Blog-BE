/**
 * Created by jialao on 2016/7/12.
 */
// var mongoose = require('mongoose');
// var User = require('../model/user');
//
// if(process.env.NODE_ENV === 'development'){
//     User.countAsync().then(function(count){
//         if(count === 0){
//             User.create({
//                 nickname:'admin',
//                     email:'admin@admin.com',
//
//             },{
//                 nickname:'test1',
//                     email:'aa@qq.com',
//
//             })
//
//
//             // User.removeAsync().then(function(){
//             //     // console.log('1')
//             //     User.createAsync({
//             //         nickname:'admin',
//             //         email:'admin@admin.com',
//             //
//             //     },{
//             //         nickname:'test1',
//             //         email:'aa@qq.com',
//             //
//             //     })
//             // })
//         }
//     })
// }


var mongoose = require('mongoose');
var	User = mongoose.model('User');
var	Article = mongoose.model('Article');
var	Tag = mongoose.model('Tag');
var Promise = require('bluebird');

//初始化标签,文章,用户
// if(process.env.NODE_ENV === 'development'){
    User.countAsync().then(function (count) {
        if(count === 0){
            User.removeAsync().then(function () {
                User.createAsync({
                    nickname:'admin',
                    email:'admin@admin.com',
                    role:'admin',
                    password:'admin'

                },{
                    nickname:'test001',
                    email:'test001@test.com',
                    role:'user',
                    password:'test'

                },{
                    nickname:'test002',
                    email:'test002@test.com',
                    role:'user',
                    password:'test'

                },{
                    nickname:'test003',
                    email:'test003@test.com',
                    role:'user',
                    password:'test'

                });
            });
        }
    });

    Tag.countAsync().then(function (count) {
        if (count === 0) {
            Tag.createAsync({
                    name: 'nodejs',


                }, {
                    name: 'angular',


                }, {
                    name: 'react',


                })
                .then(function(){
                    return Tag.findAsync()
                })
                .then(function (tags) {
                    return Article.removeAsync().then(function () {
                        return tags;
                    });
                }).map(function (tag, index) {
                console.log(index)
                var indexOne = parseInt(index) + 1;
                var indexTwo = parseInt(index) + 2;
                Article.createAsync({
                    title: '第' + (index + indexOne) + '篇文章',
                    content: '<p>我第' + (index + indexOne) + '次爱你.</p>',
                    tags: [tag._id],
                    status: 1
                }, {
                    title: '第' + (index + indexTwo) + '篇文章',
                    content: '<p>我第' + (index + indexTwo) + '次爱你.</p>',
                    tags: [tag._id],
                    status: 1
                })
            });

        }
    })


// }
