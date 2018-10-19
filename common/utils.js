// 生成随机字符串
module.exports.generateRandomStr = function (length) {
  var str = Math.random().toString(36).substring(2)
  while(str<length){
    str += Math.random().toString(36).substring(2)
  }
  return str.substring(0,length);
}