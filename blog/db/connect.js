import mongoose from 'mongoose';
import blogDbCfg from './db.config';

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

export const BlogDB = mongoose.createConnection(connectUrl, {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  useNewUrlParser: true
})

export default BlogDB;
