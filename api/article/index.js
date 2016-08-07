/**
 * Created by jialao on 2016/7/12.
 */
var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./article.controller');
var multipart = require('connect-multiparty')
var router = express.Router();

router.post('/addArticle',auth.hasRole('admin'),controller.addArticle);
router.get('/getArticleList',auth.hasRole('admin'),controller.getArticleList);
// router.put('/:id/updateArticle',auth.hasRole('admin'),controller.updateArticle);
router.delete('/:id',auth.hasRole('admin'),controller.destroy);


router.get('/getFrontArticleList',controller.getFrontArticleList);
router.get('/getFrontArticleCount',controller.getFrontArticleCount);
router.get('/:id/getFrontArticle',controller.getFrontArticle);

router.get('/:id/getPrenext',controller.getPrenext);
router.put('/:id/toggleLike',auth.isAuthenticated(),controller.toggleLike);
router.post('/upload',multipart(),controller.upload);

module.exports = router;