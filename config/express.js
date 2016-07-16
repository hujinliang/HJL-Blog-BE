/**
 * Created by jialao on 2016/7/12.
 */

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cors = require('cors');
var methoOverride = require('method-override');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var config = require('./env');
var mongoStore = require('connect-mongo')(session);


module.exports = function(app){
    app.enable('trust proxy');
    var options = {

    };
    
    app.set('views',path.join(__dirname,'../views'));
    app.set('view engine', 'ejs');
    app.use(cors(options));
    app.use(compression());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use(methoOverride());
    app.use(cookieParser());
    app.use(session({
        secret:config.session.secrets,
        resave:false,
        saveUninitialized:false,
        store:new mongoStore({
            url:config.mongo.uri,
            collection:'sessions'
        })
    }))
    app.use(passport.initialize())
}