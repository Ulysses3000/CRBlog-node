var express = require('express')
var blogController = require('./blog/api')
var officialController = require('./official/api')

var router = express.Router()
blogController(router)
officialController(router)
module.exports =  router
