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
    seedDB:true
    
    
}

var config = _.merge(all,require('./'+process.env.NODE_ENV+'.js')||{});


module.exports = config;