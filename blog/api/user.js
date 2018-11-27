const user = {};
module.exports = user;
const RES_CODE = require('../../common/resCode')
const dbFn = require('../../db/connect').blogConnect
const userSchema = require('../instance/user')
const userCountSchema = require('../instance/userCount')
const Token = require('../instance/token')
const redis = require('redis')


const MAN = 0, WOMAN = 1;
const CONST_TIME = {
  ONE_DAY: 24 * 60 * 60 * 1000
}
const CONST_TIME_SECOND = {
  ONE_DAY: 24 * 60 * 60
}
function redisOperateError(e, db, back) {
  db.end()
  back(RES_CODE.DB_OPERATE_ERROR, e)
}
function mongoOperateError(e, db, back) {
  db.close()
  console.log(e);
  back(RES_CODE.DB_OPERATE_ERROR, e.message || e.errmsg)
}

// function computeExpireTime(createTime) {
//   let week = createTime.getDay()
//   return (6 - week) * CONST_TIME_SECOND.ONE_DAY
// }

user.login = (req, res, back) => {
  let { name, pwd } = req.body
  if (!name || !pwd) { back(RES_CODE.PARAM_ERROR, '参数错误') }
  let db = dbFn()
  db.on('open', function () {
    const User = db.model('user', userSchema)
    User.findOne({ name: name }, (err, user) => {
      if (err) { return back(RES_CODE.DB_OPERATE_ERROR, err) }
      console.log(user);
      if (!user) {back(RES_CODE.SUCCESS, '账号不存在')}
      if (user.pwd != pwd) {back(RES_CODE.SUCCESS, '账号或密码错误')}
      // 链接 redis
      const client = redis.createClient()
      // 获取token
      client.get('user_' + user.id, (e, reply) => {
        if (e) return back(RES_CODE.DB_OPERATE_ERROR, e)
        let userInfo = reply ? JSON.parse(reply) : ''
        if(userInfo){
          // 更新角色权限
          userInfo.role = user.role;
        }else{
          userInfo = JSON.stringify({
            token: new Token(user.id),
            role: user.role
          })
        }
        // 存新的token 并设置过期时间
        client.setex('user_' + user.id, 7*CONST_TIME_SECOND.ONE_DAY, userInfo, (e, replies) => {
          if (e) return back(RES_CODE.DB_OPERATE_ERROR, e)
          back(RES_CODE.SUCCESS, replies)
          client.quit();
        })
      })
    })
  })
  // back(RES_CODE.SUCCESS,'login')
}
function checkRegistInfo({ name, pwd }) {
  if (name == undefined) { return '请输入名称' }
  if (pwd == undefined) { return '请输入密码' }
  if (!(/[\d\w]{6,12}/.test(pwd))) { return '密码必须由6到12位字母或者数字' }
  if (/[^\x00-\xff\d\w]/.test(pwd)) { return '名称必须由汉字字母或者数字组成' }
}
user.regist = (req, res, back) => {
  // 参数验证
  let { name, pwd, mail, alias, age, sex } = req.body
  let unAble = checkRegistInfo(req.body)
  if (unAble) {
    back(RES_CODE.PARAM_ERROR, unAble)
    return;
  }
  let db = dbFn()

  db.on('open', async function () {
    const User = db.model('user', userSchema)
    // 检测是否有该用户
    let hasUser = await checkHasUser(User,name)
    if(hasUser && hasUser.length){
      db.close();
      return back(RES_CODE.PARAM_ERROR,'该用户已经存在')
    }
    // uid 生成
    var userCount = db.model('userCount', userCountSchema)
    let hasError = false;
    let userCountNum = 188;
    let countResult = await userCount.find()
      .catch((e) => { hasError = true ;mongoOperateError(e, db, back) })
    if (!countResult || countResult.length==0) {
      let firstCount = new userCount({count: 188 })
      firstCount.save().catch((e) => { hasError = true ;mongoOperateError(e, db, back) })
    } else {
      let idCount = countResult[0].count
      await userCount.findByIdAndUpdate(countResult[0]._id, { count: ++idCount })
        .catch((e) => { hasError = true ;mongoOperateError(e, db, back) })
      userCountNum = idCount;
    }
    if(hasError){
      return;
    }
    // 创建用户
    
    let oneUser = new User({
      name: name,
      pwd: pwd,
      mail: mail,
      age: +age ? age : age,
      sex: sex == WOMAN ? WOMAN : MAN,
      alias: alias,
      uid: userCountNum
    })
    oneUser.save().then(() => {
      db.close();
      back(RES_CODE.SUCCESS, true)
    }).catch(e => {
      db.close();
      if (e) { return back(RES_CODE.DB_OPERATE_ERROR, e.errmsg||e.message)}
    })
  })
  // db.on('error',function(e){
  //   console.log(e);
  //   back(RES_CODE.DB_CONNECT_ERROR,'数据库错误失败')
  // })
  // back(RES_CODE.SUCCESS,'注册成功')
}

async function checkHasUser (User,name){
  let data = await User.find({name:name})
  return data
}