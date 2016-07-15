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
    seedDB:true,
    snsLogins:['github','qq'],
    qq:{
        clientID:"clientID",
        clientSecret:"clientSecret",
        callbackURL:"/auth/qq/callback"
    }
};

var config = _.merge(all,require('./'+process.env.NODE_ENV+'.js')||{});


module.exports = config;