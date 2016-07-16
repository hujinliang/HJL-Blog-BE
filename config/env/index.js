/**
 * Created by jialao on 2016/7/12.
 */
var path = require('path')
var _ = require('lodash')
var fs = require('fs')

var all = {
    env:process.env.NODE_ENV,
    port:process.env.PORT||9000,
    mongo:{
        options:{
            db: {
                safe: true
            }
        }
    },
    session:{
        secrets:'hjl-zq'
    },
    userRoles: ['user', 'admin'],
    seedDB:true,
    snsLogins:['qq'],
    qq:{
        clientID:"101331657",
        clientSecret:"f3fb9d389710d8cf3fccc498721dc0fe",
        callbackURL:"/auth/qq/callback"
    }
};

var config = _.merge(all,require('./'+process.env.NODE_ENV+'.js')||{});


module.exports = config;