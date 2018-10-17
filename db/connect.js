const mongoose = require('mongoose');
const blogDbCfg = require('../config/db/blog')
mongoose.set('debug', true);
module.exports.blogConnect = function () {
  // mongodb://user:pass@localhost:port,anotherhost:port,yetanother:port/database
  let connectUrl = blogDbCfg.protocol + blogDbCfg.user + ':' + blogDbCfg.pwd + '@' + blogDbCfg.address + ':' + blogDbCfg.port + '/' + blogDbCfg.dbName
  let connectOption = {
    // dbName: blogDbCfg.dbName,
    // user: blogDbCfg.user,
    // pass: blogDbCfg.pwd,
    useNewUrlParser: true
  }
  console.log(connectUrl);
  return mongoose.createConnection(connectUrl, connectOption);
}
module.exports.officialConnect = function () {

}
