var express = require('express')
var blog = require('./blog')
var main = require('./main')

var router = express.Router()

router.get('/blogApi',(req,res,next)=>{
  blog(req,res,next,'get')
})
router.post('/blogApi',(req,res,next)=>{
  blog(req,res,next,'post')
})
router.get('/mainApi',(req,res,next)=>{
  main(req,res,next,'post');
})
router.post('/mainApi',(req,res,next)=>{
  main(req,res,next,'post');
})
module.exports = {
  router: router
}