let user = require('./user')
const BASE_PATH = '/blogApi/'
const RES_CODE = require('../../common/resCode')
const sendJson = require('../../common/sendJson')
const CODE = require('../../common/resCode')

const redis = require('redis')

const PATH_GET = {
  'hello':(req,res,back)=>{ back(RES_CODE.SUCCESS,'云川api 1.0')},
  'test':(req,res,back)=>{ back(RES_CODE.SUCCESS,'test api')}
}
const PATH_POST = {
  'user/login': user.login,
  'user/regist': user.regist,
}
let tokenIgnorePath =  ['user/login','user/regist','hello']
const TOKEN_IGNORE_PATH = tokenIgnorePath.map(v=>{v = BASE_PATH+v;return v}) 

function pathInTokenIgnore(path) {
  return TOKEN_IGNORE_PATH.indexOf(path)>=0;
}

async function checkToken(req,res,next) {
  if(!pathInTokenIgnore(req.path)){
    let token = req.query.token
    if(/\d+\-[\w\d]{32}/.test(token)){
      let uid = token.split('-')[0]
      const client = redis.createClient()
      // 获取token
      client.get('user_' + uid, (e, reply) => {
        if (e) return back(RES_CODE.DB_OPERATE_ERROR, e)
        let localToken = reply ? JSON.parse(reply).token : ''
        if(localToken == token){
          next()
        }else{
          sendJson.throwErrow(res,CODE.TIMEOUT_LOGIN,'登录超时')
        }
      })
    }else{
      sendJson.throwErrow(res,CODE.NOT_LOGIN,'未登录')
    }
  }else{
    next()
  }
}

function blogController(router){
  router.use(checkToken)
  for (let path_get in PATH_GET) {
    let handle_get = PATH_GET[path_get];
    router.get(BASE_PATH+path_get,(req,res)=>{
      handle_get(req,res,(status,data)=>{
        if(status == RES_CODE.SUCCESS){
          sendJson.sendData(res,data)
        }else{
          sendJson.throwErrow(res,status,data)
        }
      })
    })
  }
  for (let path_post in PATH_POST) {
    let handle_post = PATH_POST[path_post];
    router.post(BASE_PATH+path_post,async (req,res)=>{
      handle_post(req,res,(status,data)=>{
        if(status == RES_CODE.SUCCESS){
          sendJson.sendData(res,data)
        }else{
          sendJson.throwErrow(res,status,data)
        }
      })
    })
  }
}


module.exports = blogController