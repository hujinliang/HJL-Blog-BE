/**
 * Created by jialao on 2016/7/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
   name:{
       type:String,
       unique:true
   } ,
    is_index:{
    	type:Boolean,
    	default:false
    },
    sort:{
    	type:Number,
    	default:1
    }
});

var Tag = mongoose.model('Tag',TagSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Tag);
Promise.promisifyA;;(Tag.prototype);

module.exports = Tag;