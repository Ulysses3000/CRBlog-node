const user = {};
module.exports = user;
const RES_CODE = require('../../common/resCode')
user.login = (req,res,back) => {
  back(RES_CODE.SUCCESS,'login')
}
user.regist = (req,res,back) =>{
  back(RES_CODE.SUCCESS,'注册成功')
}