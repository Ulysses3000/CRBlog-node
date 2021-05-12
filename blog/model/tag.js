const { BlogDB } = require( '../db/connect')
const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  /** 名称 唯一 */
  name: { type: String, unique: true, required: true }, 

  /** tagId */
  id: { type: Number, autoIndex: true, default: 1000 },

  /** 标签颜色 */ 
  color: {  type: String }, 
})

const Tag = BlogDB.model('tag', TagSchema);

module.exports.Tag = Tag;