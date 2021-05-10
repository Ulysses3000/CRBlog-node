const RES_CODE = {
  SUCCESS: 0, // 成功
  ERROR: 101, // 基础错误码

  

  NOT_LOGIN: 102, // 未登录
  TIMEOUT_LOGIN: 103, // 登录超时



  PARAM_ERROR: 1000, // 参数错误



  DB_CONNECT_ERROR: 2000, // 数据库错误
  DB_OPERATE_ERROR: 2001, // 数据库操作错误 
}
module.export = RES_CODE;