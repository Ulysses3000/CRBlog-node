const user = {};
module.exports = user;
const RES_CODE = require('../../common/resCode')
const dbFn = require('../../db/connect').blogConnect
const userSchema = require('../instance/user')

user.login = (req,res,back) => {
  back(RES_CODE.SUCCESS,'login')
}
user.regist = (req,res,back) =>{
  console.log(req.body);
  console.log(req.params);
  console.log(req.url);
  console.log(req.query);
  console.log(req.query.id);
  console.log(req.query.name);
  console.log('-----------');
  let {name,pwd,mail} = req.query
  name ==undefined
    ? back(RES_CODE.ERROR,'请填写姓名')
    : nameReg.test(name)
      ? back(RES_CODE.ERROR,'请输入正确的名称')
      : ''
  // let db = dbFn()
  // db.on('open',function(e){
  //   if(e){console.log(e);return}
  //   const User = db.module('user',userSchema)
  //   var oneUser = new user({
  //     name: 'admin',
  //     alias: '弟弟',
  //     uid: 188,
  //     pwd: 'admin'
  //   })
  //   db.disConnect();
  // })
  back(RES_CODE.SUCCESS,'注册成功')
}