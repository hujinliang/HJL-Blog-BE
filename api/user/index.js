/**
 * Created by jialao on 2016/7/12.
 */
var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./user.controller');

var router = express.Router();

router.get('/getUserList',auth.hasRole('admin'),controller.getUserList);
router.post('/addUser',auth.hasRole('admin'),controller.addUser);
router.delete('/:id',auth.hasRole('admin'),controller.destroy);


router.put('/mdUser',auth.isAuthenticated(),controller.mdUser);
router.get('/getUserProvider',auth.isAuthenticated(),controller.getUserProvider);
router.get('/me',auth.isAuthenticated(),controller.getMe);
router.get('/snsLogins',controller.getSnsLogins);

module.exports = router;