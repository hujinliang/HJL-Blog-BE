var _ = require('lodash');
var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

exports.getFrontTagList = function(req,res,next){
	Tag.findAsync({},{},{sort:{'sort':-1}}).then(function(result){
		return res.status(200).json({data:result})
	}).catch(function(err){
		return next(err)
	})
};

exports.addTag = function(req,res,next){
    var tagName = req.body.name;

    Tag.findOneAsync({name:tagName})
        .then(function(tag){
            if(tag){
                return res.status(403).send({error_msg:'标签已存在'})
            }
            return Tag.createAsync(req.body)
                .then(function(result){
                    return res.status(200).json({data:result})
                })
        })
}

exports.deleteTag = function(req,res,next){
    var id = req.params.id;
    Tag.findByIdAndRemoveAsync(id)
        .then(function(){
            return res.status(200).json({success:true})
        })
}