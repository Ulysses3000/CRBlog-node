const user = {};
module.exports = user;
const RES_CODE = require('../../common/resCode')
const dbFn = require('../../db/connect').blogConnect
const userSchema = require('../instance/user')
const userCountSchema = require('../instance/userCount')

const redis = require("redis")


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
  back(RES_CODE.DB_OPERATE_ERROR, e)
}

function computeExpireTime(createTime) {
  var week = createTime.getDay()
  return (6 - week) * CONST_TIME_SECOND.ONE_DAY
  // return new Date(lastDay).setHours(23,59,59,0)
}

user.login = (req, res, back) => {
  let { name, pwd } = req.body
  if (!name || !pwd) { back(RES_CODE.PARAM_ERROR, '参数错误') }
  let db = dbFn()
  db.on('open', function () {
    const User = db.model('user', userSchema)
    User.findOne({ name: name }, (err, user) => {
      if (err) { return back(RES_CODE.DB_OPERATE_ERROR, err) }
      // console.log(user);
      if (user) {
        if (user.pwd == pwd) {
          // 链接 redis
          const client = redis.createClient()
          client.get('user_' + user.id, (e, reply) => {
            if (e) return back(RES_CODE.DB_OPERATE_ERROR, e)
            var userInfo = reply ? JSON.parse(reply) : ''
            client.setex('user_' + user.id, computeExpireTime(new Date()), userInfo ? userInfo.token : newToken, (e, replies) => {
              if (e) return back(RES_CODE.DB_OPERATE_ERROR, e)
              back(RES_CODE.SUCCESS, replies)
              client.quit();
            })
          })

        } else {
          back(RES_CODE.SUCCESS, '账号或密码错误')
        }
      } else {
        back(RES_CODE.SUCCESS, '账号不存在')
      }
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
  let { name, pwd, mail, alias, age, sex } = req.body
  let unAble = checkRegistInfo(req.query)
  if (unAble) {
    back(RES_CODE.PARAM_ERROR, unAble)
    return;
  }
  let db = dbFn()


  db.on('open', async function () {
    var userCount = db.model('userCount', userCountSchema)
    var count = await userCount.find()
      .catch((e) => { redisOperateError(e, userCount, back) })
      console.log(count);
    if (!count) {
      count = { userCount: 188 }
      await userCount.create(count)
        .catch((e) => { redisOperateError(e, userCount, back) })
    } else {
      await userCount.findByIdAndUpdate({ userCount: count.userCount }, { userCount: ++count.userCount })
        .catch((e) => { redisOperateError(e, userCount, back) })
      // count.userCount+=1
    }
    const User = db.model('user', userSchema)
    let oneUser = new User({
      name: name,
      pwd: pwd,
      mail: mail,
      age: +age ? age : age,
      sex: sex == WOMAN ? WOMAN : MAN,
      alias: alias,
      id: count.userCount
    })
    oneUser.save().then(() => {
      db.close();
      back(RES_CODE.SUCCESS, '注册成功')
    }).catch(e => {
      db.close();
      if (e) { return back(RES_CODE.DB_OPERATE_ERROR, e) }
    })
  })
  // db.on('error',function(e){
  //   console.log(e);
  //   back(RES_CODE.DB_CONNECT_ERROR,'数据库错误失败')
  // })
  // back(RES_CODE.SUCCESS,'注册成功')
}