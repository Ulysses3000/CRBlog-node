let express = require('express');
let config = require('./config/index') 
let router = require('./module/router')

var jsonMiddleware = express.json() 
let app = express();
app.get('/',function(req,res){
  res.send('hello world!')
})
app.get('/a',function(req,res){
  res.send('hello world!aaaaaaaaaaaaaa')
})
// 自动解析 json 类型的 post 请求，req的 body 属性会被解析后的 对象 所覆盖。
app.use(jsonMiddleware)
// 使用路由
app.use(router)
app.listen(config.port,() => {
  console.log('app is start in listen: ' + config.port);
})