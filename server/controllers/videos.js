/**
 * Created by jhh on 2017/2/10.
 */
const AV = require('../lean');
const router = {
  get: {},
  post: {},
  delete: {}
}

const Video = AV.Object.extend('Video');
const Word = AV.Object.extend("Word");



router.get.getVideosNew = (req, res) => {
  let queryVideo = new AV.Query('Video');

  queryVideo.addDescending('createdAt');
  queryVideo.include(['author','word'])
  let videos = [];
  queryVideo.find().then((results) => {

    results.forEach(function (result) {

      videos.push({
        id:result.get('id'),
        url:result.get('url'),
        likeCount:result.get('likeCount'),
        dislikeCount:result.get('dislikeCount'),
        word:{
          wordname:result.get('word').get('wordname'),
        },
        author:{
              id:result.get('author').get('id'),
              username:result.get('author').get('username'),
        }
      })
     })
    res.json(videos)
  });

};

router.get.getLikeCount = (req,res)=>{
  let queryVideo = new AV.Query('Video');
  let userId = req.params.userId;
  let author = AV.Object.createWithoutData('User', userId);
  queryVideo.equalTo('author',author);

  queryVideo.find().then((results)=>{

    let likeCount = 0;

    results.forEach(v=>{
      likeCount += v.get('likeCount');
    })

    let count = {
      likeCount:likeCount,
    };

    return count;
  })
    .catch(e=>{
    res.json(e)
  })
    .then(count=>{
    res.json(count)
  })

}

router.get.getLikeCountCurrUser = (req,res)=>{

  let queryVideo = new AV.Query('Video');
  let author =AV.User.current();

  queryVideo.equalTo('author',author);
  queryVideo.find().then((results)=>{
    let likeCount = 0;
    results.forEach(v=>{
      likeCount += v.get('likeCount');
    })

    let count = {
      likeCount:likeCount
    };

    return count;
  })
    .then(count=>{
      res.json(count)
    })
    .catch(e=>{
      res.json(e)
    })

}

router.get.getVideosCurrUser = (req,res)=>{
  let queryVideo = new AV.Query('Video');

  let author =AV.User.current();
  queryVideo.equalTo('author',author);
  queryVideo.include(['word'])
  let videos = [];
  queryVideo.find().then((results) => {

    results.forEach(function (result) {
      videos.push({
        id:result.get('id'),
        url:result.get('url'),
        likeCount:result.get('likeCount'),
        word:{
          wordname:result.get('word').get('wordname'),
        }
      })
    })
    res.json(videos)
  });

};

router.get.getVideosByUser = (req,res)=>{
  let queryVideo = new AV.Query('Video');

  let userId = req.params.userId;
  let author = AV.Object.createWithoutData('User', userId);

  queryVideo.equalTo('author',author);
  queryVideo.include('word','author');
  queryVideo.find().then(results=> {

    let videos = [];
    queryVideo.find().then((results) => {
      results.forEach(function (result) {
        videos.push({
          id: result.get('id'),
          url: result.get('url'),
          likeCount: result.get('likeCount'),
          word: {
            wordname: result.get('word').get('wordname'),
          }
        })
      })
      res.json(videos)
    });
  })
};

router.get.getVideosByWord = (req, res) => {
  let queryVideo = new AV.Query('Video');
  let queryWord = new AV.Query('Word');

  let wordname = req.params.wordname;
  queryWord.equalTo('wordname', wordname);
  queryWord.select('objectId');
  queryWord.first().then((rsl) => {

    let wordId = rsl.id;
    let word = AV.Object.createWithoutData('Word', wordId);

    queryVideo.equalTo('word', word);

    queryVideo.include('author');
    queryVideo.addDescending('likeCount');
    queryVideo.find().then((results) => {
      let videos = [];
      results.forEach(function(result){

        videos.push({
          id: result.get('id'),
          url: result.get('url'),
          likeCount: result.get('likeCount'),
          author:{
            id:result.get('author').get('id'),
            username:result.get('author').get('username'),
          }
        })

      })
      res.json(videos)
    });

    })

}

router.post.saveLikeCount = (req,res) =>{
  let videoId = req.body.videoId;
  let likeCount = req.body.likeCount;

  let video = AV.Object.createWithoutData('Video', videoId);
  video.set('likeCount',likeCount);
  video.save().then(
    res.json('added!')
  );
}



router.post.addVideo = (req, res) => {
  let url = req.body.url;
  let wordname = req.body.wordname;
  let likeCount = Number.parseInt(req.body.likeCount)
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
      video.set('author', authorId);

      video.save().then(()=>{
        res.json('added!');
      }).catch((e)=>{
        res.json(e);
      });


    })
  }else{
    res.json('login first')
  }

}

router.delete.deleteVideo = (req, res) => {
  let id = req.params.id;
  let video = AV.Object.createWithoutData('Video', id);
  video.destroy().then((video) => {

    res.json(video);
  }, err => {
    res.json(err);
  })
}

module.exports = router;
