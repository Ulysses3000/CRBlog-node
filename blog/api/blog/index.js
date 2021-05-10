const regist = require('../../controller/user/regist');
const login = require('../../controller/user/login');
const { CRRouter } = require('../common');
const {
  tagCreate,
  tagUpdate,
  tagDel,
  tagList,
  blogCreate,
  blogUpdate,
  blogDel,
  blogList
} = require('../../controller/blog');

const BLOG_API_USER = {
  'hello': CRRouter('get', (req, res, back) => { back(RES_CODE.SUCCESS,'云川api 1.0')}),
  'test': CRRouter('get', (req, res, back) => { back(RES_CODE.SUCCESS,'test api') }),
  'user/login' : CRRouter('post', login),
  'user/regist': CRRouter('post', regist)
}

const BLOG_API_TAG = {
  'tag/create': CRRouter('post', tagCreate),
  'tag/list': CRRouter('get', tagList),
  'tag/del': CRRouter('post', tagDel),
  'tag/update': CRRouter('post', tagUpdate)
}

const BLOG_API_BLOG = {
  'blog/list': CRRouter('get', blogCreate),
  'blog/add': CRRouter('post', blogList),
  'blog/del': CRRouter('post', blogDel),
  'blog/update': CRRouter('post', blogUpdate),
  'blog/detail': CRRouter('post', (req, res, back) => { back(RES_CODE.SUCCESS,'test api')})
}

module.exports = {
  BLOG_API_USER,
  BLOG_API_TAG,
  BLOG_API_BLOG
}
