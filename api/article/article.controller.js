/**
 * Created by jialao on 2016/7/13.
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var path = require('path');
// var URL = require('URL');
var MarkdownIt = require('markdown-it');
var config = require('../../config/env');
var Promise = require('bluebird');
// var tools = require('../../util/tools');


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
    var itemsPerPage = (parseInt(req.query.itemsPerPage) > 0)?parseInt(req.query.itemsPerPage):10;
    var startRow = (currentPage - 1) * itemsPerPage;
    var sort = String(req.query.sortName) || "created";
    sort = "-" + sort;
    var condition = {};
    if(req.query.tagId){

        var tagId = String(req.query.tagId);
        condition = _.defaults(condition,{ tags: { $elemMatch: { $eq:tagId } } });
    }
    Article.find(condition)
        .select('title images visit_count comment_count like_count created')
        .skip(startRow)
        .limit(itemsPerPage)
        .sort(sort)
        .exec().then(function(result){
        return res.status(200).json({
            data:result
        }).catch(function(err){
            return next(err);
        });
    })
};

exports.getFrontArticle = function(req,res,next){
    var id = req.params.id ;
    var md = new MarkdownIt({
        html:true
    });

    return Article.findByIdAsync(id).then(function(result){

        result.content = md.render(result.content);
        result.visit_count++;
        Article.findByIdAndUpdateAsync(id,{$inc:{visit_count:1}});
        return res.status(200).json({data:result.info});
    })
};

exports.toggleLike = function(req,res,next){
    var aid = new mongoose.Types.ObjectId(req.params.id);
    var userId = req.user._id;

    var isLike = _.findIndex(req.user.likeList,function(item){
        return item.toString() == req.params.id;
    });
    var conditionOne,conditionTwo,liked;
    if(isLike != -1){
        conditionOne = {'$pull':{'likeList':aid}};
        conditionTwo = {'$inc':{'like_count':-1}};
        liked = false;
    }else{
        conditionOne = {'$addToSet':{'likeList':aid}};
        conditionTwo = {'$inc':{'like_count':1}};
        liked = true;
    }

    User.findByIdAndUpdateAsync(userId,conditionOne).then(function(user){
        return Article.findByIdAndUpdateAsync(aid,conditionTwo,{new:true}).then(function(article){
            return res.status(200).json({
                success:true,
                count:article.like_count,
                isLike:liked
            })
        }).catch(function(err){
            return next(err);
        })
    })
};

exports.getPrenext = function(req,res,next){
    var id = req.params.id;
    var sort = String(req.query.sortName) || 'created';
    var preCondition={},nextCondition={};
    if(req.query.tagId){
        var tagId = String(req.query.tagId);
        preCondition = _.defaults(preCondition,{tags:{$eleMatch:{$eq:tagId}}});
        nextCondition = _.defaults(nextCondition,{tags:{$eleMatch:{$eq:tagId}}});
    }
    Article.findByIdAsync(id).then(function(article){
        if(sort == 'visit_count'){
            preCondition = _.defaults(preCondition,{'_id':{$ne:id},'visit_count':{'$lte':article.visit_count}});
            nextCondition = _.defaults(preCondition,{'_id':{$ne:id},'visit_count':{'$gte':article.visit_count}});
        }else{
            preCondition = _.defaults(preCondition,{'_id':{$ne:id},'created':{'$lte':article.visit_count}});
            nextCondition = _.defaults(preCondition,{'_id':{$ne:id},'created':{'$gte':article.visit_count}});
        };

        var prePromise = Article.find(preCondition)
            .select('title')
            .limit(1)
            .sort('-'+sort)
            .exec();
        var nextPromise = Article.find(nextCondition)
            .select('title')
            .limit(1)
            .sort(sort)
            .exec();
        prePromise.then(function(preResult){
            var prev = preResult[0] || {};
            return nextPromise.then(function(nextResult){
                var next = nextResult[0] || {};
                return {
                    'next':next,
                    'prev':prev
                }
            })
        }).then(function(result){
            return res.status(200).json({
                data:result
            })
        })

    }).catch(function(err){
        return next(err);
    })
}