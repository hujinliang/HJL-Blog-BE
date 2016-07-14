var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LogSchema = new Schema({
	uid:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},
	content:{
		type:String,
		trim:true
	},
	created:{
		type:Date,
		default:Date.now
	},
	type:String
});

var Logs = mongoose.model('Logs',LogSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Logs);
Promise.promisifyAll(Logs.prototype);

module.exports = Logs;