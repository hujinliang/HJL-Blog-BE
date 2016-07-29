var _ = require('lodash');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Article = mongoose.model('Article');

exports.addNewComment = function(req,res,next){
	var aid = req.body.aid;
	var content =req.body.content;
	var userId = req.user._id;
	var error_msg;
	if(!aid){
		error_msg = '缺少参数';
	}else if(!content || content == ''){
		error_msg = '内容不能为空';
	}
	if(error_msg){
		return res.status(422).send({
			error_msg:error_msg
		});
	}
	Comment.createAsync({
		aid:aid,
		content:content,
		user_id:userId
	}).then(function(result){
		var comment = result.toObject();
		comment.user_id = {
			_id:req.user._id,
			nickname:req.user.nickname,
			avatar:req.user.avatar
		}
		Article.findByIdAndUpdateAsync(aid,{$inc:{comment_count:1}});
		return res.status(200).json({ssuccess:true,data:comment})
	}).catch(function(err){
		return next(err);
	});
};

exports.getFrontCommentList = function(req,res,next){
	var aid = req.params.id;
	Comment.find({aid:aid})
	.sort('created')
	.populate({
		path:'user_id',
		select:'nickname avatar'
	})
	.exec().then(function(commentList){
		return res.status(200).json({data:commentList});
	})
}

exports.addNewReply = function(req,res,next){
	var cid = req.params.id;
	if(!req.body.content||req.body.content==''){
		return res.status(422).send({
			error_msg:'不能为空'
		})
	}
	var reply = req.body;
	reply.user_info = {
		id:req.user._id,
		nickname:req.user.nickname
	}
	reply.created = new Date();
	Comment.findByIdAndUpdateAsync(cid,{"$push":{"replys":reply}},{new:true}).then(function(result){
		return res.status(200).json({
			success:true,
			data:result.replys
		});
	})
}

exports.getCommentList = function(req,res,next){
    Comment.find({})
        .sort('created')
        .populate({
            path:'user_id',
            select:'nickname avatar'
        })
        .populate({
            path:'aid',
            select:'title'
        })
        .exec()
        .then(function(commentList){
            return res.status(200).json({data:commentList})
        })
}

exports.delComment = function(req,res,next){
    var cid = req.params.id;
    Comment.findByIdAndRemoveAsync(cid)
        .then(function(result){
            Article.findByIdAndUpdateAsync(result.aid,{$inc:{comment_count:-1}});
            return res.status(200).json({success:true})
        })
}

