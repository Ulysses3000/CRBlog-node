function sendJson (res,data) {
  res.json({
    data: data,
    time: +new Date()
  })
}

sendJson.sendData = (res, data) => { this(res, data) };

sendJson.throwErrow = function (res,code,message) {
  res.json({
    error: {
      code: code,
      message:  message,
    }
  })
}

module.exports = sendJson
