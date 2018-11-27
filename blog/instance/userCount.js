var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Count = {
  count: Number // 总数
}
module.exports =  new Schema(Count)