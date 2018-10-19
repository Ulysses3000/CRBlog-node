var sendJson = {}
sendJson.sendData = function (res,data) {
  res.json({
    data: data,
    time: +new Date()
  })
}
sendJson.throwErrow = function (res,code,message) {
  res.json({
    error: {
      code: code,
      message:  message,
    }
  })
}

module.exports = sendJson
