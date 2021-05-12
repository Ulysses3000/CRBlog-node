const { RES_CODE } = require('../../../common/resCode');
const { Blog } = require('../../model/blog-list');
const { BlogContent } = require('../../model/content');

function generateBlog(title, content, tag, describe) {
  let now = +new Date();
  if (!describe) {
    describe = content.slice(0, 20);
  }

  return {
    title,
    tag,
    describe,
    createTime: now,
    updateTime: now
  }
}

function updateBlogDTO (title, content, tag, describe)  {
  let now = +new Date();
  if (!describe) {
    describe = content.slice(0, 20);
  }

  const dto = {
    updateTime: now
  }
  
  title && (dto.title = title)
  tag && (dto.tag = tag)
  describe && (dto.describe = describe)

  return dto;
}

async function blogCreate (req, res, back) {
  console.log(req.body);
  let {  title, content, tag, describe } = req.body;
  if (!title || !content) back(RES_CODE.PARAM_ERROR, '参数错误');

  let blogInfo = generateBlog(title, content, tag, describe)

  let newBlog = new Blog(blogInfo);
  let contentDocument;
  // 后续优化成事务
  try {
    let saveResult = await newBlog.save();
    contentDocument = await (new BlogContent({ id: saveResult.id, content })).save();
  } catch (e){
    back(RES_CODE.DB_OPERATE_ERROR, false)
  }
  if (contentDocument && contentDocument.id) {
    back(RES_CODE.SUCCESS, true)
  }
}

async function blogUpdate (req, res, back) {
  let { id, title, content, tag, describe } = req.body;

  if (!title || !content) back(RES_CODE.PARAM_ERROR, '参数错误');

  let blogInfo = updateBlogDTO(title, content, tag, describe)

  try {
    let updateResult = await Blog.findByIdAndUpdate(id, blogInfo);
    contentDocument = await BlogContent.findByIdAndUpdate({ id, content })
  } catch (e) {
    back(RES_CODE.DB_OPERATE_ERROR, '操作失败')
  }

  if (contentDocument && contentDocument.id) {
    back(RES_CODE.SUCCESS, true)
  }
  // back(RES_CODE.SUCCESS,'test api blogUpdate')
}

async function blogDel (req, res, back) {
  let { id } = req.body;
  if (!id) back(RES_CODE.PARAM_ERROR, '参数错误');

  let updateResult = await Blog.findByIdAndUpdate(id, { discarded: 1 });
  if (!updateResult) {
    back(RES_CODE.DB_OPERATE_ERROR, '操作失败')
  } else {
    back(RES_CODE.SUCCESS, true)
  }
}

async function blogList (req, res, back) {
  // let query = req.query;
  let list = await Blog.find({ discarded: 0 });
  if (list) {
    back(RES_CODE.SUCCESS, list);
  } else {
    back(RES_CODE.DB_CONNECT_ERROR, '查询失败');
  }
}

async function blogDetail (req, res, back) {
  let { id } = req.query;
  let detail = await Blog.findById(id);
  let content = await BlogContent.findById(id);
  if (detail) {
    back(RES_CODE.SUCCESS, { ...detail, content });
  } else {
    back(RES_CODE.DB_CONNECT_ERROR, '无数据');
  }
}

module.exports = {
  blogCreate,
  blogUpdate,
  blogDel,
  blogList,
  blogDetail
}