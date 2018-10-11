const mongoose = require('mongoose');
const blogDbCfg = require('../config/db/blog')
mongoose.set('debug', true);
module.exports.blogConnect = function () {
  let connectUrl = blogDbCfg.port + blogDbCfg.address + ':' + blogDbCfg.port 
  let connectOption = {
    dbName: blogDbCfg.dbName,
    user: blogDbCfg.user,
    pass: blogDbCfg.pwd,
  }
  return mongoose.createConnection(connectUrl,connectOption);
}
module.exports.officialConnect = function(){
  
}
