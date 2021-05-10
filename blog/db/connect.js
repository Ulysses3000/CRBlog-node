const mongoose = require('mongoose')
const blogDbCfg = require('./db.config')

mongoose.set('debug', true);

let {
  port,
  protocol,
  address,
  user,
  pwd,
  dbName
} = blogDbCfg;

const connectUrl = protocol + user + ':' + pwd + '@' + address + ':' + port + '/' + dbName;

exports.BlogDB = mongoose.createConnection(connectUrl, {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  useNewUrlParser: true
})
