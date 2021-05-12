const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { BlogDB } = require( '../db/connect')

const BlogSchema = new mongoose.Schema({
  /** 名称 唯一 */
  title: { type: String, unique: true, required: true }, 

  /** id 自动生成 */
  id: { type: Number, autoIndex: true, default: 1000 },

  /** 描述 或者 简介 */
  describe: { type: String },

  /** tagId 列表 */
  tag: { type: Array },

  /** 创建时间 */ 
  createTime: {  type: String }, 

  /** 更新时间 */ 
  updateTime: {  type: String },

  /** 是否废弃，用于伪删除 */
  discarded: { type: Number, default: 0 }
})

// 分页功能
BlogSchema.plugin(mongoosePaginate);

const Blog = BlogDB.model('blog', BlogSchema);

module.exports.Blog = Blog;
