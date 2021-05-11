
async function tagCreate (req, res, back) {
  back(RES_CODE.SUCCESS,'test api tagCreate');
}

async function tagUpdate (req, res, back) {
  back(RES_CODE.SUCCESS,'test api tagUpdate');
}

async function tagDel (req, res, back) {
  back(RES_CODE.SUCCESS,'test api tagDel');
}

async function tagList (req, res, back) {
  back(RES_CODE.SUCCESS,'test api tagList');
}

module.exports = {
  tagCreate,
  tagUpdate,
  tagDel,
  tagList
}
