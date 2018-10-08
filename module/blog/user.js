const user = {};
module.exports = user;

user.login = (req,res) => {
  console.log(req);
  res.send('login')
}
user.regist = (req,res) =>{
  console.log(req);
  res.send('注册成功')
}