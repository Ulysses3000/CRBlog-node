var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Token = {
  count: Number // 总数
}
module.exports =  new Schema(Token)