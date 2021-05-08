import mongoose from 'mongoose'
import { BlogDB } from '../../db/connect';

const UserSchema = new mongoose.Schema({
  /** 名称 唯一 */
  name: { type:String, unique: true, required:true }, 

  /** 密码 */
  pwd: { type: String, required: true },

  /** 年龄 */
  age: Number,

  /** 性别 */ 
  sex: { type: Number, default: 0 },

  /** 用户id */
  uid: { type: Number, autoIndex: true, default: 188 },

  /** 别名 昵称 */ 
  alias: {  type: String, default: '萌新' }, 

  /** 邮箱 */
  mail: String, 

  /** 等级 */
  grade: { type: Number, default: 1 },

  /** 经验 */
  experience: { type: Number, default: 0 },

  /** 角色 常规1 */
  role: { type: Number, default: 1  },

  /** 是否废弃，用于伪删除 */
  discarded: { type: Number,default: 0 }
})

const User = BlogDB.model('user', userSchema);

export default User;
