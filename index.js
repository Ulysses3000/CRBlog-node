const express = require( 'express')
const config = require( './config/index.js')
const router = require( './router.js')

let app = express();
// json post请求的数据
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 使用路由
app.use(router)

app.listen(config.port,() => {
  console.log('app is start in listen: ' + config.port);
})
