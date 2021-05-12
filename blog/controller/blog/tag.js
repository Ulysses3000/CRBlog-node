const { Tag } = require('../../model/tag');
const { RES_CODE } = require('../../../common/resCode')

function randomTagColor () {
  const colorList = [
    '#f16d7a',
    '#f2debd',
    '#dcff93',
    '#f1b8e4',
    '#ff9b6a',
    '#d9b8f1',
    '#f1ccb8',
    '#b8f1ed',
    '#e7dac9',
    '#ffe543',
  ];
  return colorList[Math.round(Math.round() * colorList.length)];
}

async function tagCreate (req, res, back) {
  let { name, color } = req.body;
  if (!name) back(RES_CODE.PARAM_ERROR, '参数错误');

  let newTag = new Tag({ name, color: color || randomTagColor() })
  let saveResult = await newTag.save();

  if (!!saveResult) {
    back(RES_CODE.SUCCESS, true)
  } else {
    back(RES_CODE.DB_OPERATE_ERROR, false)
  }
}

async function tagUpdate (req, res, back) {
  let { id, updateName } = req.body;
  if (!id || !updateName) back(RES_CODE.PARAM_ERROR, '参数错误');

  let updateResult = await Tag.findByIdAndUpdate(id, { name: updateName });
  if (!updateResult) {
    back(RES_CODE.DB_OPERATE_ERROR, '操作失败')
  } else {
    back(RES_CODE.SUCCESS, true)
  }
}

async function tagDel (req, res, back) {
  let { id } = req.body;
  if (!id || !updateName) back(RES_CODE.PARAM_ERROR, '参数错误');

  let updateResult = await Tag.findByIdAndDelete(id);
  if (!updateResult) {
    back(RES_CODE.DB_OPERATE_ERROR, '操作失败')
  } else {
    back(RES_CODE.SUCCESS, true)
  }
}

async function tagList (req, res, back) {
  let query = req.query;
  let list = await Tag.find();
  if (list) {
    back(RES_CODE.SUCCESS, list);
  } else {
    back(RES_CODE.DB_CONNECT_ERROR, '查询失败');
  }
}

module.exports = {
  tagCreate,
  tagUpdate,
  tagDel,
  tagList
}
