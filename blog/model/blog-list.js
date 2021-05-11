const { BlogDB } = require( '../db/connect')

const BlogSchema = new BlogDB.Schema({
  /** 名称 唯一 */
  name: { type: String, unique: true, required: true }, 

  /** tagId */
  id: { type: Number, autoIndex: true, default: 1000 },

  /** 标签颜色 */ 
  color: {  type: String }, 
})

const BlogContentSchema = new BlogDB.Schema({
  /** 名称 唯一 */
  name: { type: String, unique: true, required: true }, 

  /** tagId */
  id: { type: Number, autoIndex: true, default: 1000 },

  /** 标签颜色 */ 
  color: {  type: String }, 
})

const Blog = BlogDB.model('blog', TagSchema);
const BlogContent = BlogDB.model('blogContent', BlogContentSchema);

module.exports.Blog = Blog;
module.exports.BlogContent = BlogContent;
