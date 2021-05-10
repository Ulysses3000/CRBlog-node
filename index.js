const express = require( 'express')
const config = require( './config/index.js')
const router = require( './router.js')

let app = express();

// 使用路由
app.use(router)

app.listen(config.port,() => {
  console.log('app is start in listen: ' + config.port);
})
