var express = require('express')
var blogController = require('./blog')
var officialController = require('./official')

var router = express.Router()
blogController(router)
// officialController(router)
router.get('/blogApi',(req,res)=>{
  res.send('get----------blogApi')
})
// router.post('/blogApi',(req,res)=>{
//   res.send('post----------blogApi')
// })
console.log(router);
module.exports =  router
