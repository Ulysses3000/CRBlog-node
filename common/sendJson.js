var sendJson = {}
sendJson.sendData = function (res,data) {
  res.send(JSON.stringify({
    data: data,
    time: +new Date()
  }))
}
sendJson.throwErrow = function (res,code,message) {
  res.send(JSON.stringify({
    error: {
      code: code,
      message:  message,
    }
  }))
}

module.exports = sendJson
