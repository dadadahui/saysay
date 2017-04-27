<template>
  <div class="video" >
    <div class="video">

        <video :src="video.url" @play="playVideo($event)"
               id="my-player"
               class="video-js vjs-big-play-centered"
               controls
               preload="auto"
               data-setup='{}'>
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
          </p>
        </video>


      <div class="thumb">
        <div class="like" @click="like(video,$event)">
          <div class="iconfont icon-zancheng" v-show="!this.likeState"></div>
          <div class="iconfont icon-zancheng-copy" v-show="this.likeState"></div>
          <div class="count">{{video.likeCount}}</div>
        </div>
        <!--<div class="dislike" @click="dislike(video,$event)">-->
          <!--<div class="iconfont icon-fandui" v-show="!this.dislikeState"></div>-->
          <!--<div class="iconfont icon-fandui-copy" v-show="this.dislikeState"></div>-->
          <!--<div class="count">{{video.dislikeCount}}</div>-->
        <!--</div>-->
      </div>
      <div class="checkComment" @click="showComments">
        Comments
      </div>
    </div>
    <mu-divider/>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  import comment from 'components/comment/comment'
  export default{
      props: {
        video: {
          type:Object
        }
      },
      data(){
        return {
          likeState:false,
          dislikeState:false
        }
      },
      methods:{
        like(video,event){
          if(!event._constructed){
            return;
          }
          this.likeState = !this.likeState;
          if (this.likeState){
            video.likeCount++;
          }else{
            video.likeCount--;
          }
          this.$http.post('http://localhost:9099/api/videos/savelikeCount',
            {
              likeCount:video.likeCount,
              videoId:video.id
            }
          ).then((response)=>{
            console.log(response.data);
          })

        },
        dislike(video,event){
          if(!event._constructed){
            return;
          }
          this.dislikeState = !this.dislikeState;
          if (this.dislikeState){
            video.dislikeCount++;
          }else{
            video.dislikeCount--;
          }

          this.$http.post('http://localhost:9099/api/videos/saveDislikeCount',
            {
              dislikeCount:video.dislikeCount,
              videoId:video.id
            }
          ).then((response)=>{
            console.log(response.data);
          })
        },
        //一个播放，其他暂停
        playVideo(event){
          let currVideo = event.currentTarget;

          let $others = $('video').not(currVideo)
          for(let item of $others){
            item.pause()
          }
        },
        showComments(){
          this.$emit('show-comment')
        }

      },
      components:{
        comment
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>



  .circle
    width: 40px
    height 40px
    border-radius 50%
    background #7e57c2
    opacity 0.7
    position absolute
    color: #fff
    text-align center
.video
  .user
    box-sizing border-box
    height: 50px
    padding 15px
    padding-top: 10px;
    .avatar
      vertical-align text-top
      margin-right 10px
      width: 35px
      height 35px
    .username
      font-size: 15px
      color: #E91E63
      vertical-align: -webkit-baseline-middle;
    .delete
      position: absolute;
      right: 10px;
  .word
    box-sizing border-box
    height: 50px
    padding 15px
    background #E91E63
    overflow: hidden
    clear: both
    position relative
    .word-name
      color: #fff
      font-size 20px
    .video-num
      width: 45px
      height: 45px
      position absolute
      top: 3px
      right: 15px
      background-size 45px
      background url("https://image.flaticon.com/icons/svg/149/149101.svg") no-repeat
      text-align: center;
      line-height: 47px;
      color: #fff
  .video
    width:100%
    height 0
    padding-top  100%
    position relative
    background #FAFAFA
    .video-js
      position absolute
      width: 100%
      height 100%
      top 0
      left:0

    .thumb
      position absolute
      left: 15px
      top:40%
      .iconfont
        font-size 24px
        position: absolute;
        top: -5px;
        left: 9px;
      .count
        position absolute
        top: 20px;
        left: 16px;

      .like
        @extend .circle
        top:0
        left:0

      .dislike
        @extend .circle
        top: 30px
        left:0


    .checkComment
      position absolute
      bottom: 60px
      left: 10px
      color: #fff
      font-size 12px



</style>
