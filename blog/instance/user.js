var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = {
  // 名称 唯一
  name: {
    type:String,
    unique: true,
    required:true
  }, 
  pwd: {
    type: String,
    required: true
  },
  age: Number,
  sex: {
    type: Number,
    default: 0
  },
  uid: {
    type: Number,
    autoIndex: true,
    default: 188,
  }, 
  alias: {
    type: String,
    default: 'n不v知z名h大a佬ng',
  }, // 昵称
  mail: String, // 邮箱
  grade: {
    type: Number,
    default: 1
  },
  experience: {
    type: Number,
    default: 0
  }
}
module.exports =  new Schema(User)