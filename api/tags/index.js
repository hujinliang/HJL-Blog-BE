/**
 * Created by jialao on 2016/7/12.
 */
var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./tags.controller');

var router = express.Router();

router.get('/getFrontTagList',controller.getFrontTagList);


module.exports = router;