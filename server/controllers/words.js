/**
 * Created by jhh on 2017/2/9.
 */
const AV = require('../lean');
const router = {
  get:{},
  post:{},
  delete:{}
}

const Word = AV.Object.extend('Word');

router.get.getAllWords = (req,res)=>{
  let query = new AV.Query('Word');
  query.find().then((results)=>{
    //an array
    res.json(results);
  })
}
//从url获取某单词
router.get.getWord  = (req,res)=>{
  let query = new AV.Query('Word');
  let wordname = req.params.wordname;

  query.startsWith('wordname', wordname);
  query.find().then(results=>{
    res.json(results)
  })
}

router.post.addWord = (req,res)=>{
  let wordname = req.body.wordname;
  let word = new Word();
  //所有人可读可写
  var acl = new AV.ACL(req.currentUser);
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(true);
  word.setACL(acl);

  word.set('wordname',wordname);
  word.save().then(()=>{
    res.json('add success!');
  },err=>{
    res.json(err)
  });
};


router.delete.deleteWord = (req,res)=>{
  let id = req.params.id;
  let word = AV.Object.createWithoutData('Word',id);

  let queryVideo = new AV.Query('Video');
  queryVideo.equalTo('word',word);
  queryVideo.find().then(videos=>{
    return     AV.Object.destroyAll(videos)
  }).then(res.json('delete videos!'))

  word.destroy().then(()=>{
    res.json('delete word!')
  },err=>{
    res.json(err);
  });
}



module.exports = router;
