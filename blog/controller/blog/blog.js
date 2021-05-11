const { RES_CODE } = require('../../../common/resCode');

exports.blogCreate = async function  (req, res, back) {
  back(RES_CODE.SUCCESS,'test api blogCreate')
}
exports.blogUpdate = async function  (req, res, back) {
  back(RES_CODE.SUCCESS,'test api blogUpdate')
}
exports.blogDel = async function  (req, res, back) {
  back(RES_CODE.SUCCESS,'test api blogDel')
}
exports.blogList = async function  (req, res, back) {
  back(RES_CODE.SUCCESS,'test api blogList')
}