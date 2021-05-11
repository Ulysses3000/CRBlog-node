const { User } = require( '../../model/user')
const { generateRandomStr } = require( '../../../utils/utils')
const { TIME_SECOND } = require( './utils')
const { RES_CODE } = require( '../../../common/resCode')
// const redis = require( 'redis')

/** 检测注册信息 */
function checkRegistInfo({ name, pwd }) {
  if (/[^\x00-\xff\d\w]/.test(name)) { return '名称必须由汉字字母或者数字组成' }
  if (!(/[\d\w]{6,12}/.test(pwd))) { return '密码必须由6到12位字母或者数字' }
}

/** 检测用户是否存在 */
async function checkHasUser (User,name){
  let data = await User.find({name:name})
  return data
}

/** 生成一个用户 */
async function ganerateUser (name, pwd, mail, age, sex, alias, uid) {
  age = +age ? age : age
  sex = sex == WOMAN ? WOMAN : MAN
  return await new User({
    name, pwd, mail, age, sex, alias, uid,
  });
}


exports.regist = async function regist (req, res, back) {
  // 参数验证
  let { name, pwd, mail, alias, age, sex } = req.body
  let unAble = checkRegistInfo(req.body)
  if (unAble) {
      back(RES_CODE.PARAM_ERROR, unAble)
      return;
  }

  // 检测是否有该用户
  let hasUser = await checkHasUser(User,name)
  if(hasUser && hasUser.length){
    back(RES_CODE.PARAM_ERROR,'该用户已经存在')
    return;
  }

  // 创建用户
  let uid = ganerateUid();
  let oneUser = ganerateUser(name, pwd, mail, age, sex, alias, uid);
  await oneUser.save();

  back(RES_CODE.SUCCESS, true);
}