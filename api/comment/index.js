/**
 * Created by jialao on 2016/7/12.
 */
var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./comment.controller');


var router = express.Router();

router.delete('/:id',auth.hasRole('admin'),controller.delComment);
router.get('/getCommentList',auth.hasRole('admin'),controller.getCommentList);


router.post('/addNewComment',auth.isAuthenticated(),controller.addNewComment);
router.get('/:id/getFrontCommentList',controller.getFrontCommentList);
router.post('/:id/addNewReply',auth.isAuthenticated(),controller.addNewReply);


module.exports = router;