/**
 * Created by jhh on 2017/1/19.
 */
var express = require('express');
var router = express.Router();

const usersRouter = require('./controllers/users')
const wordsRouter = require('./controllers/words')
const videosRouter = require('./controllers/videos')
const commentRouter = require('./controllers/comment')


router.get('/api/users/follower',usersRouter.get.getFollowers);
router.get('/api/users/follewees',usersRouter.get.getFollowees);
router.get('/api/users/currUser',usersRouter.get.getCurrUser);
router.post('/api/users/signup',usersRouter.post.signup);
router.post('/api/users/login',usersRouter.post.login);
router.post('/api/users/logout',usersRouter.post.logout);
router.post('/api/users/follower',usersRouter.post.follow);
router.post('/api/users/unfollow',usersRouter.post.unfollow);
router.get('/api/users/:userId',usersRouter.get.getUser);

  router.get('/api/words',wordsRouter.get.getAllWords);
  router.get('/api/words/:wordname',wordsRouter.get.getWord);
  router.post('/api/words',wordsRouter.post.addWord);
  router.delete('/api/words/:id',wordsRouter.delete.deleteWord);

router.get('/api/videos/new',videosRouter.get.getVideosNew);
router.get('/api/videos/:wordname',videosRouter.get.getVideosByWord);
router.get('/api/videos/currUser',videosRouter.get.getVideosCurrUser);
router.get('/api/videos/thumbcount/:userId',videosRouter.get.getThumbCount);
router.get('/api/videos/thumbcount/currUser',videosRouter.get.getThumbCountCurrUser);
router.get('/api/videos/:userId',videosRouter.get.getVideosByUser);
router.post('/api/videos',videosRouter.post.addVideo);
  router.post('/api/videos/saveLikeCount',videosRouter.post.saveLikeCount);
  router.post('/api/videos/saveDislikeCount',videosRouter.post.saveDislikeCount);
  router.delete('/api/videos/:id',videosRouter.delete.deleteVideo);

  router.post('/api/comments',commentRouter.post.addComment);
  router.get('/api/comments/:videoId',commentRouter.get.getCommentsByVideo);

module.exports = router;
