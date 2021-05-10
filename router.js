let express = require('express')
let blogController = require('./blog/api')
let officialController = require('./official/api')

let router = express.Router()
blogController(router)
officialController(router)

module.exports = router

