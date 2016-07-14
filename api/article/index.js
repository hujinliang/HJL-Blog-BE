/**
 * Created by jialao on 2016/7/12.
 */
var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./article.controller');
var multer = require('multer');
var upload = multer({dest:'upload/'});

var router = express.Router();

router.get('/getFrontArticleList',controller.getFrontArticleList);
router.get('/getFrontArticleCount',controller.getFrontArticleCount);
router.get('/:id/getFrontArticle',controller.getFrontArticle);

router.get('/:id/getPrenext',controller.getPrenext);
router.put('/:id/toggleLike',auth.isAuthenticated(),controller.toggleLike);


module.exports = router;