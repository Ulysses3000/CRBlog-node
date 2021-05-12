// yunchuan blog content
const { BlogDB } = require( '../db/connect')
const mongoose = require("mongoose");


const BlogContentSchema = new mongoose.Schema({
  /** id */
  id: { type: Number, autoIndex: true, default: 1000 },

  /** md 内容 */ 
  content: {  type: String }, 
})

const BlogContent = BlogDB.model('blogContent', BlogContentSchema);

module.exports.BlogContent = BlogContent;
