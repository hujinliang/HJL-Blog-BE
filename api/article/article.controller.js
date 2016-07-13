/**
 * Created by jialao on 2016/7/13.
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var path = require('path');
var URL = require('URL');
var MarkdownIt = require('markdown-it');
var config = require('../../config/env');
var Promise = require('bluebird');
var tools = require('../../util/tools');


exports.getFrontArticleCount = function(req,res,next){
    var condition = {};
    if(req.query.tagId){
        var tagId = String(req.query.tagId);
        condition = _.defaults(condition,{tags:{$elemMatch:{$eq:tagId}}});

    }
    Article.countAsync(condition).then(function(count){
        return res.status(200).json({
            success:true,
            count:count
        })
    }).catch(function(err){
        return next(err);
    })
};

exports.getFrontArticleList = function(req,res,next){
    var currentPage = (parseInt(req.query.currentPage) > 0)?parseInt(req.query.currentPage):1;
    var itemsPerPage
};