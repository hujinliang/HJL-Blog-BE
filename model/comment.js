/**
 * Created by lenovo on 2016/7/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({

	aid:{
		type:Schema.Types.ObjectId,
		ref:'Article'
	},
	user_id:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},
	content:{
		type:String
	},
	created:{
		type:Date,
		default:Date.now
	},
	replys:[
		{
			content:String,
			user_info:Object,
			created:Date
		}
	]


});

var Comment = mongoose.model('Comment',CommentSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Comment);
Promise.promisifyAll(Comment.prototype);

module.exports = Comment;