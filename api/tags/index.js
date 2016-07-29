/**
 * Created by jialao on 2016/7/12.
 */
var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./tags.controller');

var router = express.Router();

router.post('/addTag',auth.hasRole('admin'),controller.addTag);
router.get('/getTagList',auth.hasRole('admin'),controller.getFrontTagList);
router.delete('/:id',auth.hasRole('admin'),controller.deleteTag);
// router.put('/:id',auth.hasRole('admin'),controller.updateTag)

router.get('/getFrontTagList',controller.getFrontTagList);


module.exports = router;