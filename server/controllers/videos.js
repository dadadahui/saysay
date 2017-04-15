/**
 * Created by jhh on 2017/2/10.
 */
const AV = require('../lean');
const co = require('co');
const router = {
  get: {},
  post: {},
  delete: {}
}

const Video = AV.Object.extend('Video');
const Word = AV.Object.extend("Word");

//author、word

router.get.getVideosNew = (req, res) => {
  let queryVideo = new AV.Query('Video');
  let queryWord = new AV.Query('Word');
  let queryUser = new AV.Query('User');

  queryVideo.addDescending('createdAt');

  queryVideo.find().then((results) => {

    let promises = [];

    results.forEach(function (result) {
      var video = {};

      promises.push(
        queryWord.get(result.get('word').get('id'))
          .then(word=>{
            let wordname = word.get('wordname');
            return wordname;
          })
          .then(wordname=>{
             video = {
              id:result.get('id'),
              url:result.get('url'),
              likeCount:result.get('likeCount'),
              dislikeCount:result.get('dislikeCount'),
              // author:authorObj,
              word:{
                wordname:wordname
              }
            }
            return  queryUser.get(result.get('author').get('id'));
          })
          .then(author=>{
            let authorObj  = {
              id:author.get('id'),
              username:author.get('username'),
              avatar:author.get('avatar').get('url')
            };
            video.author = authorObj
            return video;
          })
      )
     })
    Promise.all(promises).then((videos)=>{
      res.json(videos)
    })
  });

};


//特定单词，按like数倒序
router.get.getVideosByWord = (req, res) => {
  let queryVideo = new AV.Query('Video');
  let queryWord = new AV.Query('Word');
  let queryUser = new AV.Query('User');

  let wordname = req.params.wordname;
  // 根据wordname查id
  queryWord.equalTo('wordname', wordname);
  queryWord.select('objectId');
  queryWord.first().then((result) => {

    let wordId = result.id;
    let word = AV.Object.createWithoutData('Word', wordId);

    queryVideo.equalTo('word', word);

    // 想在查询的同时获取关联对象的属性则一定要使用 `include` 接口用来指定返回的 `key`
    queryVideo.include('word');

    queryVideo.addDescending('likeCount');
    queryVideo.find().then((results) => {

      let promises = [];

      results.forEach(function (result) {
        var video = {};

        promises.push(
          queryWord.get(result.get('word').get('id'))
            .then(word=>{
              let wordname = word.get('wordname');
              return wordname;
            })
            .then(wordname=>{
              video = {
                id:result.get('id'),
                url:result.get('url'),
                likeCount:result.get('likeCount'),
                dislikeCount:result.get('dislikeCount'),
                // author:authorObj,
                word:{
                  wordname:wordname
                }
              }
              return  queryUser.get(result.get('author').get('id'));
            })
            .then(author=>{
              let authorObj  = {
                id:author.get('id'),
                username:author.get('username'),
                avatar:author.get('avatar').get('url')
              };
              video.author = authorObj
              return video;
            })
        )
      })
      Promise.all(promises).then((videos)=>{
        res.json(videos)
      })
    })
  })
}

router.post.addLikeCount = (req,res) =>{
  let videoId = req.body.videoId;
  let likeCount = req.body.likeCount;

  let video = AV.Object.createWithoutData('Video', videoId);
  video.set('likeCount',likeCount);
  video.save().then(
    res.json('added!')
  );
}

router.post.addDislikeCount = (req,res) =>{
  let videoId = req.body.videoId;
  let dislikeCount = req.body.dislikeCount;

  let video = AV.Object.createWithoutData('Video', videoId);
  video.set('dislikeCount',dislikeCount);
  video.save().then(
    res.json('added!')
  );
}
router.post.addVideo = (req, res) => {
  let url = req.body.url;
  let wordname = req.body.wordname;
  let likeCount = req.body.likeCount;
  let dislikeCount = req.body.dislikeCount;
  // let authorId = req.currentUser;//just an id
  let authorId = AV.User.current();
  let video = new Video();

  if (authorId !== undefined){
    let queryWord = new AV.Query("Word");

    queryWord.equalTo('wordname', wordname);
    queryWord.first().then((result) => {
      let word = AV.Object.createWithoutData('Word', result.id);

      video.set('url', url);
      video.set('word', word);
      video.set('likeCount', likeCount);
      video.set('dislikeCount', dislikeCount);
      video.set('author', authorId);

      let acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(AV.User.current(), true);

      video.setACL(acl);

      video.save().then(()=>{
        res.json('added!');
      }).catch((e)=>{
        res.json(e);
      });


    })
  }

}

router.delete.deleteVideo = (req, res) => {
  let id = req.params.id;
  let video = AV.Object.createWithoutData('Video', id);
  video.destroy().then(() => {
    res.json('deleted!');
  }, err => {
    res.json(err);
  })
}

module.exports = router;
