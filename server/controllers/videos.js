/**
 * Created by jhh on 2017/2/10.
 */
const AV = require('../lean');
const co = require('co');
const router = {
  get:{},
  post:{},
  delete:{}
}

const Video = AV.Object.extend('Video');
const Word = AV.Object.extend("Word");

router.get.getVideosNew = (req, res)=>{
  let queryVideo = new AV.Query('Video');

  queryVideo.find().then((results,resolve,reject) => {
    let videos = [];

    results.forEach(function *(result){

      let wordId = result.get('word').id;

      let queryWord = new AV.Query('Word');
      yield queryWord.get(wordId).then((word) => {

        let wordname = word.get('wordname');
        let videosCount = word.get('videosCount');

        result.set('word',
          {
            'wordname': wordname,
            'videosCount': videosCount
          });

        videos.push(result);

      }).catch(e=>{
        console.log(e)
      })

    });
    return videos;

  })

 .catch(e=>{
    console.log(e)
  }).then(videos=>{
    res.json(videos);
  })
};



//浏览次数
router.get.getVideosHot = (req,res)=>{
  let query = new AV.Query('Video');
  query.addDescending('views');
  query.find().then((results)=>{
    res.json(results);
  })
}
//特定单词，按like数倒序
router.get.getVideosByWord = (req,res)=>{
  let queryVideo = new AV.Query('Video');
  let queryWord = new AV.Query('Word');
  let wordname = req.params.wordname;
  // 根据wordname查id
  queryWord.equalTo('wordname',wordname);
  queryWord.select('objectId');
  queryWord.first().then((result)=>{

    let wordId = result.id;
    let word = AV.Object.createWithoutData('Word', wordId);

    queryVideo.equalTo('word', word);

    // 想在查询的同时获取关联对象的属性则一定要使用 `include` 接口用来指定返回的 `key`
    queryVideo.include('word');

    queryVideo.addDescending('likeCount');
    queryVideo.find().then((results)=>{
      res.json(results);
    })
  })
}
router.post.addVideo = (req,res)=>{
  console.log(req.body)
  let url = req.body.url;
  let user = req.body.user;
  let wordname = req.body.wordname;
  let likeCount = req.body.likeCount;
  let dislikeCount = req.body.dislikeCount;
  let views= req.body.views;

  let video = new Video();
  let query = new AV.Query("Word");

  query.equalTo('wordname',wordname);
  query.first().then((result)=>{
    let wordId = result.id;
    let word = AV.Object.createWithoutData('Word', wordId);
    // let wordObj = {};
    // word.fetch().then(()=>{
    //   wordObj.wordname = word.get('wordname');
    //   wordObj.videosCount = word.get('videosCount');
    // })
    video.set('url',url);
    // console.log(req.currentUser)
    // video.set('user',req.currentUser);
    video.set('user',user);
    video.set('word',word);//Pointer类型
    video.set('likeCount',likeCount);
    video.set('dislikeCount',dislikeCount);
    video.set('views',views);
    video.save().then(()=>{
      res.json(video)
    },err=>{
      res.json(err);
    })
  })


}

router.delete.deleteVideo = (req,res)=>{
  let id = req.params.id;
  let video = AV.Object.createWithoutData('Video',id);
  video.destroy({sessionToken:req.sessionToken}).then(()=>{
    res.json('deleted!');
  },err=>{
    res.json(err);
  })
}

module.exports = router;
