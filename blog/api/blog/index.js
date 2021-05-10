import { regist } from '../controller/user/regist';
import { login } from '../controller/user/login';
import { CRRouter } from '../common'
import {
  tagCreate,
  tagUpdate,
  tagDel,
  tagList,
  blogCreate,
  blogUpdate,
  blogDel,
  blogList
} from '../../controller/blog';

export const BLOG_API_USER = {
  'hello': CRRouter('get', (req, res, back) => { back(RES_CODE.SUCCESS,'云川api 1.0')}),
  'test': CRRouter('get', (req, res, back) => { back(RES_CODE.SUCCESS,'test api') }),
  'user/login' : CRRouter('post', login),
  'user/regist': CRRouter('post', regist)
}

export const BLOG_API_TAG = {
  'tag/create': CRRouter('post', tagCreate),
  'tag/list': CRRouter('get', tagList),
  'tag/del': CRRouter('post', tagDel),
  'tag/update': CRRouter('post', tagUpdate)
}

export const BLOG_API_BLOG = {
  'blog/list': CRRouter('get', blogCreate),
  'blog/add': CRRouter('post', blogList),
  'blog/del': CRRouter('post', blogDel),
  'blog/update': CRRouter('post', blogUpdate),
  'blog/detail': CRRouter('post', (req, res, back) => { back(RES_CODE.SUCCESS,'test api')})
}
