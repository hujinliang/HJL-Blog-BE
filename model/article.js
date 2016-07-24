var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	author_id:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},
	title:{
		type:String,
		unique:true
	},
	content:String,
	images:{
		type:Array
	},
	tags:[{
		type:Schema.Types.ObjectId,
		ref:'Tag'
	}],
	visit_count:{
		type:Number,
		default:1
	},
	comment_count:{
		type:Number,
		default:0
	},
	like_count:{
		type:Number,
		default:1
	},
	top:{
		type:Boolean,
		default:false
	},
	created:{
		type:Date,
		default:Date.now
	}
});

ArticleSchema
	.virtual('info')
	.get(function(){
		return {
			'_id':this._id,
			'title':this.title,
			'content':this.content,
			'images':this.images,
			'comment_count':this.comment_count,
			'visit_count':this.visit_count,
			'like_count':this.like_count,
			'created':this.created
		}
	});

var Article = mongoose.model('Article',ArticleSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Article);
Promise.promisifyAll(Article.prototype);

module.exports = Article;