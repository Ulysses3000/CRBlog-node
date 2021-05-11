// const redis = require('redis');
const sendJson = require('../../common/sendJson');
const { RES_CODE } = require('../../common/resCode');
const { 
  // BLOG_API_USER,
  BLOG_API_TAG,
  BLOG_API_BLOG
} = require('./blog');

const BASE_PATH = '/api/blog/';

let tokenIgnorePath =  ['user/login','user/regist','hello']
const TOKEN_IGNORE_PATH = tokenIgnorePath.map(v => { 
  v = BASE_PATH+v;
  return v
}) 

function pathInTokenIgnore(path) {
  return TOKEN_IGNORE_PATH.indexOf(path)>=0;
}

// async function checkToken(req,res,next) {
//   if(!pathInTokenIgnore(req.path)){
//     let token = req.query.token
//     if(/\d+\-[\w\d]{32}/.test(token)){
//       let uid = token.split('-')[0]
//       const client = redis.createClient()
//       // 获取token
//       client.get('user_' + uid, (e, redisToken) => {
//         if (e) return back(RES_CODE.DB_OPERATE_ERROR, e)
//         if(redisToken == token){
//           next()
//         }else{
//           sendJson.throwErrow(res,CODE.TIMEOUT_LOGIN, '登录超时')
//         }
//       })
//     }else{
//       sendJson.throwErrow(res,CODE.NOT_LOGIN,'未登录')
//     }
//   }else{
//     next()
//   }
// }

function blogController(router){
  // 登录验证拦截
  // router.use(checkToken)

  let allRouter = Object.assign({}, 
    // BLOG_API_USER, // redis 功能未完善
    BLOG_API_TAG,
    BLOG_API_BLOG
  );

  // api在 express 注册
  for (let path in allRouter) {
    let { handle, methods } = allRouter[path];
    router[methods](BASE_PATH + path, (req, res)=>{
      handle(req, res, (status,data) => {
        if(status == RES_CODE.SUCCESS){
          sendJson.sendData(res, data)
        }else{
          sendJson.throwErrow(res, status, data)
        }
      })
    })
  }
}

module.exports = blogController;
