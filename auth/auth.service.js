/**
 * Created by jialao on 2016/7/12.
 */

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/env');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = mongoose.model('User');



exports.isAuthenticated = function(){
    
}