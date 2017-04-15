<template>
  <div class="home">
    <mt-navbar class="page-part" v-model="selected">
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="hot">
        <div class="content" ref="contentWrapper">
          <ul id="container">
            <li v-for = "(video,index) in newVideos" class="item">

                <div class="user">
                  <img :src="video.author.avatar" class="avatar">
                  <span class="username">{{video.author.username}}</span>
                  <!--<span v-show="canDelete(video.author.id)" class="delete iconfont icon-guanbifuzhi">X</span>-->
                  <span  @click = "deleteVideo(video.id)" class="delete iconfont icon-guanbifuzhi">X</span>
                </div>


                  <div class="word" @click="goTo(video.word.wordname)">
                    <span class="word-name">{{video.word.wordname}}</span>
                    <!--<span class="video-num">{{video.word.videosCount}}</span>-->
                  </div>


                <div class="video">
                  <!--<video :src="video.url" controls @play="playVideo($event)" ref="video"></video>-->
                  <video :src="video.url" @play="playVideo($event)"
                    id="my-player"
                    class="video-js vjs-big-play-centered"

                    preload="auto"

                    data-setup='{}'>
                    <p class="vjs-no-js">
                      To view this video please enable JavaScript, and consider upgrading to a
                      web browser that
                    </p>
                  </video>
                  <div class="thumb">
                    <div class="like" @click="like(video,$event)">{{video.likeCount}}</div>
                    <div class="dislike" @click="dislike(video,$event)">{{video.dislikeCount}}</div>
                  </div>
                  <div class="views">{{video.views}}</div>
                </div>


            </li>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import $ from 'jquery';

  export default{
      data() {
        return {
          selected: 'hot',
          newVideos:[],
          currUserId:''
        };
      },
      methods:{
        like(video,event){
          if(!event._constructed){
            return;
          }
          video.likeCount ++;
          this.$http.post('http://localhost:9099/api/videos/addLikeCount',
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
          video.dislikeCount ++;
          this.$http.post('http://localhost:9099/api/videos/addDislikeCount',
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
        goTo:function (wordname) {
          this.$router.push({ name: 'wordDetail', params: { wordname: wordname }});
        },
        canDelete(id){
          return this.currUserId == id;
        },
        deleteVideo(id){
            this.$http.delete(`http://localhost:9099/api/videos/${id}`).then((response)=>{
              window.location.reload()
          });
        }
      },
      created(){
        let vm = this;
        this.$http.get('http://localhost:9099/api/videos/new').then((response)=>{
          vm.newVideos = response.data;
        });
         this.$http.get('http://localhost:9099/api/users/currUser').then((response)=>{
          console.log(response)

          this.currUserId = response.data;
        });


      },

      mounted(){
        //更新DOM
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.contentWrapper,{
              click:true
            })
          }else{
            this.scroll.refresh();
          };
          if(!this.scroll1){
            this.scroll1 = new BScroll(this.$refs.contentWrapper1,{
              click:true
            })
          }else{
            this.scroll1.refresh();
          }
        })
      },



    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .circle
    width: 30px
    height 30px
    border-radius 50%
    background #000
    opacity 0.5
    position absolute
    color: #fff
    text-align center

  .home
    .content
      position fixed
      top: 40px
      bottom 55px
      left: 0
      width:100%
      overflow: hidden
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
            .like
              @extend .circle
              top:-20px
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
