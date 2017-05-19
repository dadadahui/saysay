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
      res.saveCurrentUser(loginedUser);
      res.json({
        errno:0
      })
    },err=>{
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

router.post.logout= (req,res)=>{
  AV.User.logOut().then(res.json('logout!'));
}

router.post.follow = (req,res)=>{
  let userId = req.body.userId;
  AV.User.current().follow(userId).then(res.json('follower  success!'))
}
router.post.unfollow = (req,res)=>{
  let userId = req.body.userId;
  AV.User.current().follow(userId).then(res.json('unfollow  success!'))
}
//查询自己的粉丝
router.get.getFollowers = (req,res)=>{
  if (AV.User.current()){
    let query = AV.User.current().followerQuery();
    query.include('follower');
    query.find().then(function(followers){
      res.json(followers);
    });
  }
}

//查询自己的粉丝
router.get.getFollowees = (req,res)=>{
  if (AV.User.current()){
    let query = AV.User.current().followeeQuery();
    query.include('followee');
    query.find().then(function(followees){
      res.json(followees);
    });
  }

}
router.get.getCurrUser = (req,res)=>{
  let user =AV.User.current();
  res.json(user)
}

router.get.getUser = (req,res)=>{
  let userId = req.params.userId;

  var query = new AV.Query('_User');
 query.get(userId).then(user=>{
   res.json(user)
 })
}

module.exports = router;
