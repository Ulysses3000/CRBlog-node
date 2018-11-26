let express = require('express');
let config = require('./config/index') 
let router = require('./router')
var bodyParser = require('body-parser');
// var multer = require('multer'); // v1.0.5
// var upload = multer(); // for parsing multipart/form-data


let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 自动解析 json 类型的 post 请求，req的 body 属性会被解析后的 对象 所覆盖。
// var jsonMiddleware = express.json() 
// app.use(jsonMiddleware)

// app.post('/profile', upload.array(), function (req, res, next) {
//   console.log(req.body);
//   res.json(req.body);
// });
// 使用路由
app.use(router)
app.listen(config.port,() => {
  console.log('app is start in listen: ' + config.port);
})