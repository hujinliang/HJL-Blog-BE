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
    is_index
});