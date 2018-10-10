let express = require('express');
let config = require('./config/index') 
let router = require('./router')
// var router = express.Router()


var jsonMiddleware = express.json() 
let app = express();
// 自动解析 json 类型的 post 请求，req的 body 属性会被解析后的 对象 所覆盖。
app.use(jsonMiddleware)
// 使用路由
app.use(router)
app.listen(config.port,() => {
  console.log('app is start in listen: ' + config.port);
})