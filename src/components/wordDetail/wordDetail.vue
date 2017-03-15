<template>
  <div v-show="showFlag" class="wordDetail" >
    <div class="word">
      <span class="word-name">{{word.wordname}}</span>
      <span class="add-video" @click="takeVideo">add a video</span>
    </div>
    <div class="videoList" ref="listWrapper">
      <ul >
        <li v-for = "video in videos" class="item">
          <div class="user">
            <img :src="video.user.avatar" class="avatar">
            <span class="username">{{video.user.username}}</span>
          </div>
          <div class="video">
            <video :src="video.url" autoplay ></video>
            <div class="thumb">
              <div class="like">{{video.likeCount}}</div>
              <div class="dislike">{{video.dislikeCount}}</div>
            </div>
            <div class="views">{{video.views}}</div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";

    export default{
      props:{
        word:{
          type:Object
        }
      },
      data(){
        return {
          showFlag:false,
          videos:[]
        }
      },
      methods:{
        show(){
          this.showFlag=true;
          this.$nextTick(()=>{
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.listWrapper,{
                click:true
              })
            }else{
              this.scroll.refresh();
            };
          })
        },
        takeVideo(){
          this.$router.replace('/main/shoot');
        }

      },
      computed:{
        wordname:function () {
          return this.word.wordname
        },

      },

      mounted:function () {
        // ${this.wordname}
        this.$http.get(`http://localhost:9099/api/videos/bye`).then((response)=>{
          this.videos = response.data;
          console.log(this.videos);
        });

      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .circle
    width: 30px
    height 30px
    border-radius 50%
    background #000
    opacity 0.5
    position absolute
    color: #fff
    text-align centerr
  .wordDetail
    position fixed
    top: 40px
    left:0
    bottom 55px
    width 100%
    overflow hidden
    background #fff
    .word
      box-sizing border-box
      height: 50px
      padding 15px
      background #E91E63
      display: flex
      color: #fff
      text-align: center;
      font-size 20px
      .word-name,.add-video
        flex: 1
    .videoList
      position fixed
      top: 90px
      left:0
      bottom 55px
      width 100%
      overflow hidden
      background #fff
      .item
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
        .video
          width:100%
          height 0
          padding-top  100%
          position relative
          background #FAFAFA
          video
            position absolute
            top 0
            left:0
            height 100%
          .thumb
            position absolute
            left: 15px
            top:50%
            .like
              @extend .circle
              top:0
              left:0

            .dislike
              @extend .circle
              top: 25px
              left:0
          .views
            position absolute
            top: 10px
            right: 15px
            color: #eaeaea


</style>
