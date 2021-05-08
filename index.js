import express from 'express';
import config from './config/index';
import router from './router';

let app = express();

// 使用路由
app.use(router)

app.listen(config.port,() => {
  console.log('app is start in listen: ' + config.port);
})
