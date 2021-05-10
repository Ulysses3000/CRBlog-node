
const { User } = require('../../model/user')
const { generateRandomStr } = require('../../../utils/utils')
const { TIME_SECOND } = require('./utils')
const { RES_CODE } = require('../../../common/resCode')
const redis = require('redis')

function findUser (name) {
  return new Promise((res, rej) => {
    User.findOne({ name: name }, (err, user) => {
      if (err) {
        rej(err);
      } else {
        ref(user);
      }
    })
  })
}

/** 验证用户存在 */
async function validUser (req, res, back) {
  let { name, pwd } = req.body

  if (!name || !pwd) {
    back(RES_CODE.PARAM_ERROR, '参数错误')
    return;
  }

  let user = await findUser(name).catch(e => back(RES_CODE.DB_OPERATE_ERROR, err));
  
  if (!user) {
    back( RES_CODE.SUCCESS, '账号不存在')
    return ;
  }

  if (user.pwd != pwd) {
    back(RES_CODE.SUCCESS, '账号或密码错误')
    return;
  }

  return user;
}

function ganerateToken (userId) {
  return user.uid + '-' + generateRandomStr(32);
}

const client = redis.createClient()

function getTokenByUserId (userId) {
  return new Promise((res, rej) => {
    client.get('user_' + user.id, (e, token) => {
      if (e) return rej(e);
      res(token);
    })
  })
}

function writeLoginToken (userId, token) {
  return new Promise((res, rej) => {
    client.set('user_' + user.id, token, (e, token) => {
      if (e) return rej(e);
      res(token);
    })
  })
}

function writeLoginUserInfo (token, user) {
  const time = 7 * TIME_SECOND.ONE_DAY;
  const data = JSON.stringify( user )
  return new Promise((res, rej) => {
    // 存新的token 并设置过期时间
    client.setex(token, time, data, (e, replies) => {
      if (e) return back(RES_CODE.DB_OPERATE_ERROR, e)
      let backRes =  {
        token: token
      }
    })
  })
}

/**  登录接口 post */
exports.login = async function (req, res, back) {
  let user = await validUser(req, res, back);
  
  let token = getTokenByUserId(user.id);

  if (!token) {
    token = ganerateToken(user.id) ;
    await writeLoginToken(token);
  }

  await writeLoginUserInfo(token, user);

  back(RES_CODE.SUCCESS, token);
}

