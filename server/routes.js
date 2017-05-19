/**
 * Created by jhh on 2017/1/19.
 */
const express = require('express');
const router = express.Router();
const AV = require('./lean');

const usersRouter = require('./controllers/users')
const wordsRouter = require('./controllers/words')
const videosRouter = require('./controllers/videos')
const commentRouter = require('./controllers/comment')

function checkLogin(req, res, next) {
  if(AV.User.current() == null){
    console.log('login first')
    // 332需要登录帐户。
    res.json({
      errno:332,
      msg:'login first!'
    })
  }else{
    next()
  }
}
//new curr wordname
router.get('/videos/new',videosRouter.get.getVideosNew);
router.get('/videos/currUser',videosRouter.get.getVideosCurrUser);
router.get('/videos/:wordname',videosRouter.get.getVideosByWord);

router.get('/videos/:userId',videosRouter.get.getVideosByUser);
router.get('/videos/likeCount/currUser',videosRouter.get.getLikeCountCurrUser);
router.get('/videos/likeCount/:userId',videosRouter.get.getLikeCount);
router.post('/videos',videosRouter.post.addVideo);
router.post('/videos/saveLikeCount',videosRouter.post.saveLikeCount);
router.delete('/videos/:id',videosRouter.delete.deleteVideo);

router.get('/users/follower',usersRouter.get.getFollowers);
router.get('/users/follewees',usersRouter.get.getFollowees);
router.get('/users/currUser',usersRouter.get.getCurrUser);
router.post('/users/signup',usersRouter.post.signup);
router.post('/users/login',usersRouter.post.login);
router.post('/users/logout',usersRouter.post.logout);
router.post('/users/follow',usersRouter.post.follow);
router.get('/users/:userId',usersRouter.get.getUser);
router.post('/users/unfollow',usersRouter.post.unfollow);

router.get('/words',wordsRouter.get.getAllWords);
router.get('/words/:wordname',wordsRouter.get.getWord);
router.post('/words',wordsRouter.post.addWord);
router.delete('/words/:id',wordsRouter.delete.deleteWord);

router.post('/comments',checkLogin,commentRouter.post.addComment);
router.get('/comments/:videoId',commentRouter.get.getCommentsByVideo);



module.exports = router;
