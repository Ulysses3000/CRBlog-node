let user = require('./user')
const BASE_PATH = 'blogApi/'
const PATH_GET = {
  '':(req,res)=>{ res.send('hahah , 欢迎回来')},
  'user/login': user.login,
  // 'user/getFollowing': user.getFollowing,
  // 'user/getFollower': user.getFollower,
  // 'user/following': user.following,
}
const PATH_POST = {
  'user/regist': user.regist,
}
function blogController(router){
  for (let path_get in PATH_GET) {
    let handle_get = PATH_GET[path_get];
    router.get(BASE_PATH+path_get,handle_get)
    console.log(BASE_PATH+path_get,handle_get);
  }
  for (let path_post in PATH_POST) {
    let handle_post = PATH_POST[path_post];
    router.post(BASE_PATH+path_post,handle_post)
    console.log(BASE_PATH+path_post,handle_post);
  }
}


module.exports = blogController