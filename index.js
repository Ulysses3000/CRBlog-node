let express = require('express');
let config = require('./config/index') 
let router = require('./')

let app = express();
app.get('/',function(req,res){
  res.send('hello world!')
})
app.get('/a',function(req,res){
  res.send('hello world!aaaaaaaaaaaaaa')
})
app.use(router)
app.listen(config.port,() => {
  console.log('app is start in listen: ' + config.port);
})