const { BlogDB } = require( '../db/connect')

const TagSchema = new BlogDB.Schema({
  /** 名称 唯一 */
  name: { type: String, unique: true, required: true }, 

  /** tagId */
  id: { type: Number, autoIndex: true, default: 1000 },

  /** 标签颜色 */ 
  color: {  type: String }, 
})

const User = BlogDB.model('tag', TagSchema);

module.exports.User = User;