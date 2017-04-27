/**
 * Created by jhh on 2017/4/17.
 */
const AV = require('../lean');
const router = {
  get: {},
  post: {},
  delete: {}
}
const Comment = AV.Object.extend('Comment');

router.post.addComment = (req,res)=>{
  let videoId = req.body.videoId;
  let authorId = AV.User.current();
  let content = req.body.content;
  let queryUser = new AV.Query('User');
  let comment = new Comment();

  let video = AV.Object.createWithoutData('Video', videoId);

  comment.set('video',video);
  comment.set('author',authorId);
  comment.set('content',content);

  comment.save().then((result)=>{

    queryUser.get(result.get('author').get('id'))
      .then(user=>{
        comment = {
          id:result.get('id'),
          author:{
            id:user.get('id'),
            username:user.get('username')
          },
          content:result.get('content')
        }
        res.json(comment)
      })


  }).catch((e)=>{
    res.json(e);
  });
}

router.get.getCommentsByVideo = (req,res)=>{
  let videoId = req.params.videoId;
  let queryComment = new AV.Query('Comment');
  let video = AV.Object.createWithoutData('Video', videoId);

  queryComment.equalTo('video',video);
  queryComment.addDescending('createdAt');
  queryComment.include('author');
  let comments = [];
  queryComment.find().then((results)=> {

    results.forEach(result=>{
      let author = result.get('author');

     comments.push({
        id:result.get('id'),
        author:author,
       content:result.get('content')
      })
    })
    return comments;
  }).then(comments=>{
    res.send(comments)
  })
}


module.exports = router;
