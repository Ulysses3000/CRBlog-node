/** 生成随机字符串 */ 
exports.generateRandomStr = function  (length) {
  let str = '',arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  for (var i = 0; i < length; i++) {
      str += arr[~~(Math.random()*arr.length)]
  }
  return str
}

/** redis 操作错误 */
 exports.redisOperateError = function (e, db, back) {
  db.end()
  back(RES_CODE.DB_OPERATE_ERROR, e)
}

/** 数据库操作报错 */
exports.mongoOperateError = function (e, db, back) {
  db.close()
  console.log(e);
  back(RES_CODE.DB_OPERATE_ERROR, e.message || e.errmsg)
}