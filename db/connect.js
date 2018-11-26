const mongoose = require('mongoose');
const blogDbCfg = require('../config/db/blog')
const sendJson = require('../common/sendJson')
const RES_CODE = require('../common/resCode')
mongoose.set('debug', true);
module.exports.blogConnect = function (res) {
  // mongodb://user:pass@localhost:port,anotherhost:port,yetanother:port/database
  let connectUrl = blogDbCfg.protocol + blogDbCfg.user + ':' + blogDbCfg.pwd + '@' + blogDbCfg.address + ':' + blogDbCfg.port + '/' + blogDbCfg.dbName
  let connectOption = {
    // dbName: blogDbCfg.dbName,
    // user: blogDbCfg.user,
    // pass: blogDbCfg.pwd,
    useNewUrlParser: true
  }
  console.log(connectUrl);
  var dbConnection = mongoose.createConnection(connectUrl, connectOption)
  dbConnection.on('error',()=>{
    sendJson.throwErrow(RES_CODE.DB_CONNECT_ERROR,res,'数据库错误')
  })
  return dbConnection;
}
module.exports.officialConnect = function () {

}
