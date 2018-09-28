var path = require('path')
module.exports = {
  port: 3000,
  dbUrl: 'mongodb://127.0.0.1:27017/blog',
  rootDir: path.join(__dirname,'../')
}