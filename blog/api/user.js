const user = {};
module.exports = user;
const RES_CODE = require('../../common/resCode')
const dbFn = require('../../db/connect').blogConnect
const userSchema = require('../instance/user')

user.login = (req,res,back) => {
  back(RES_CODE.SUCCESS,'login')
}
function checkRegistInfo({name,pwd}) {
  if(name == undefined){return '请输入名称'}
  if(pwd == undefined){return '请输入密码'}
  if(!(/[\d\w]{6,12}/.test(pwd))){return '密码必须由6到12位字母或者数字'}
  if(/[^\x00-\xff\d\w]/.test(pwd)){return '名称必须由汉字字母或者数字组成'}
}
user.regist = (req,res,back) =>{
  let {name,pwd,mail,alias,age,sex} = req.query
  var unAble = checkRegistInfo(req.query)
  if(unAble){
    back(RES_CODE.ERROR,unAble)
    return;
  }
  let db = dbFn()
  db.on('open',function(){
    const User = db.model('user',userSchema)
    var oneUser = new User({
      name: name,
      pwd: pwd,
      mail: mail,
      age: age,
      sex: sex,
      alias: alias,
    })
    oneUser.save().then(()=>{
      db.close();
      back(RES_CODE.SUCCESS,'注册成功')
    }).catch(e=>{
      if(e){console.log(e);return back(RES_CODE.DB_OPERATE_ERROR,e)}
    })
  })
  db.on('error',function(e){
    console.log(e);
    back(RES_CODE.DB_CONNECT_ERROR,'数据库错误失败')
  })
  // back(RES_CODE.SUCCESS,'注册成功')
}