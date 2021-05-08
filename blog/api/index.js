import redis from 'redis';
import { regist } from '../controller/user/regist';
import { login } from '../controller/user/login';
import { RES_CODE } from '../../common/resCode';
import sendJson from '../../common/sendJson';

const BASE_PATH = '/api/blog/';

const BLOG_API_GET = {
  'hello':(req,res,back)=>{ back(RES_CODE.SUCCESS,'云川api 1.0')},
  'test':(req,res,back)=>{ back(RES_CODE.SUCCESS,'test api')}
}

const BLOG_API_POST = {
  'user/login': login,
  'user/regist': regist,
}

let tokenIgnorePath =  ['user/login','user/regist','hello']
const TOKEN_IGNORE_PATH = tokenIgnorePath.map(v => { 
  v = BASE_PATH+v;
  return v
}) 

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
      client.get('user_' + uid, (e, redisToken) => {
        if (e) return back(RES_CODE.DB_OPERATE_ERROR, e)
        if(redisToken == token){
          next()
        }else{
          sendJson.throwErrow(res,CODE.TIMEOUT_LOGIN, '登录超时')
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
  // 登录验证拦截
  router.use(checkToken)

  // get 请求在 express 注册
  for (let path in BLOG_API_GET) {
    let handle_get = BLOG_API_GET[path];
    router.get(BASE_PATH + path, (req,res)=>{
      handle_get(req, res, (status,data) => {
        if(status == RES_CODE.SUCCESS){
          sendJson.sendData(res,data)
        }else{
          sendJson.throwErrow(res,status,data)
        }
      })
    })
  }

  // post 请求在 express 注册
  for (let path in BLOG_API_POST) {
    let handle_post = PATH_POST[path];
    router.post(BASE_PATH + path, async (req,res)=>{
      handle_post(req,  res, (status, data) => {
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