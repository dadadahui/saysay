/**
 * Created by jhh on 2017/1/19.
 */

const usersRouter = require('./controllers/users')
const wordsRouter = require('./controllers/words')
const videosRouter = require('./controllers/videos')

module.exports = app =>{
  app.post('/api/users/signup',usersRouter.post.signup);
  app.post('/api/users/login',usersRouter.post.login);
  app.get('/api/users/currUser',usersRouter.get.getCurrUser);

  app.get('/api/words',wordsRouter.get.getAllWords);
  app.get('/api/words/:wordname',wordsRouter.get.getWord);
  app.post('/api/words',wordsRouter.post.addWord);
  app.delete('/api/words/:id',wordsRouter.delete.deleteWord);

  app.get('/api/videos/new',videosRouter.get.getVideosNew);
  // app.get('/api/videos/hot',videosRouter.get.getVideosHot);
  app.get('/api/videos/:wordname',videosRouter.get.getVideosByWord);
  app.post('/api/videos',videosRouter.post.addVideo);
  app.post('/api/videos/addLikeCount',videosRouter.post.addLikeCount);
  app.post('/api/videos/addDislikeCount',videosRouter.post.addDislikeCount);
  app.delete('/api/videos/:id',videosRouter.delete.deleteVideo);


};
