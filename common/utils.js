// 生成随机字符串
module.exports.generateRandomStr = function (length) {
  // var str = Math.random().toString(36).substring(2)
  // while(str<length){
  //   str += Math.random().toString(36).substring(2)
  // }
  // return str.substring(0,length);
  let str = '',arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  for (var i = 0; i < length; i++) {
      str += arr[~~(Math.random()*arr.length)]
  }
  return str
}