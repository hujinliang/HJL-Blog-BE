var _ = require('lodash');
var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

exports.getFrontTagList = function(req,res,next){
	Tag.findAsync({},{},{sort:{'sort':-1}}).then(function(result){
		return res.status(200).json({data:result})
	}).catch(function(err){
		return next(err)
	})
}