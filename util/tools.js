/**
 * Created by lenovo on 2016/7/16.
 */
var _ = require('lodash');

exports.randomString = function(len){
    len=len||12;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = $char.length;
    var pwd = '';
    for(var i= 0; i < len; i++){
        pwd += $chars.chaAt(Math.floor(Math.random()*maxPos));
    }
    return pwd;
}