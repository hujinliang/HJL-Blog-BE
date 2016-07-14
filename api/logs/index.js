/**
 * Created by jialao on 2016/7/12.
 */
var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./logs.controller');

var router = express.Router();

router.get('/getLogsList',auth.hasRole('admin'),controller.getLogsList);



module.exports = router;