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
  sex: { // 性别
    type: Number,
    default: 0
  },
  uid: {
    type: Number,
    autoIndex: true,
    default: 188,
  }, 
  alias: { // 别名
    type: String,
    default: '萌新',
  }, // 昵称
  mail: String, // 邮箱
  grade: {
    type: Number,
    default: 1
  },
  experience: { // 经验
    type: Number,
    default: 0
  },
  role: { // 是否废弃，用于伪删除
    type: Number,
    default: 1 // 1 白板之身
  },
  discarded: { // 是否废弃，用于伪删除
    type: Number,
    default: 0
  }
}
module.exports =  new Schema(User)