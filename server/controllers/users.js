/**
 * Created by jhh on 2017/1/19.
 */
const AV = require('../lean');

const  router = {
  get:{},
  post:{}
}
const defAvatar = new AV.File.withURL('defAvatar.svg', 'https://image.flaticon.com/icons/svg/145/145852.svg');
defAvatar.save();

router.post.signup = (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  const user = new AV.User();

  user.setUsername(username);
  user.setPassword(password);
  user.set('avatar',defAvatar);

  user.signUp()
    .then(loginedUser => {
      // 保存当前用户到 Cookie
      //加上后，返回速度慢
      res.saveCurrentUser(loginedUser);
      res.json({
        errno:0
      })
    },err=>{
      //202，用户已注册
      res.json({
        errno:1,
        err:err
      })
    })
   };


router.post.login = (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  // AV.User.become(Math.random().toString())
  AV.User.logIn(username,password)
    .then(loginedUser => {
      res.saveCurrentUser(loginedUser);      // req.currentUser,只有一个id

      res.json({
        errno:0
      })
    },err=>{
      res.json({
        errno:1,
        err:err,
      })
    })
}

router.get.getCurrUser = (req,res)=>{
  res.json(req.currentUser)
  // res.json(AV.User.current())
}


module.exports = router;
