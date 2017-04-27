<template>
<div class="me">
  <div class="up">
    <div class="avatar">
      <mu-avatar slot="left" :size=60 src="https://image.flaticon.com/icons/svg/145/145852.svg"/>
    </div>
    <div class="username">
      {{this.currUser.username}}
    </div>
    <div class="thumbCount">
      <span class="likeCount"><span class="iconfont icon-zancheng" ></span>{{likeCount}}</span>
      <!--<span class="dislikeCount"><span class="iconfont icon-fandui" ></span>{{dislikeCount}}</span>-->
    </div>
    <div class="follow">
      <span class="followers" @click="goToFollower">follow：{{followers.length}}</span>
      <span class="followees" @click="goToFollowee">fans：{{followees.length}}</span>
    </div>


    <div class="logout" >
      <mu-flat-button  @click="this.logOut" label="logout" class="demo-flat-button" primary/>
    </div>
    <mu-divider/>
  </div>
  <div class="videoswrapper" ref="videosWrapper">
    <ul class="videos">
      <li v-for="video of videos">
        <div class="wordname" >
          <span @click="goTo(video.word.wordname)">{{video.word.wordname}}</span>
          <mu-flat-button  class="demo-flat-button" primary icon="delete" @click="deleteVideo(video.id)"/>
        </div>
        <mvideo :video="video"></mvideo>
      </li>
    </ul>
  </div>

</div>
</template>

<script type="text/ecmascript-6">
  import mvideo from "components/video/video";
  import BScroll from "better-scroll";

  export default{
    data(){
      return {
        currUser: {},
        likeCount: '',
        dislikeCount: '',
        videos: [],
        followers:[],
        followees:[]
      }
    },
    methods: {
      logOut(){
        this.$http.post('http://localhost:9099/api/users/logout').then(
          this.$router.replace('/')
        )
      },
      goToWordDetail: function (wordname) {
        this.$router.push({name: 'wordDetail', params: {wordname: wordname}});
      },
      goToFollower:function () {
        this.$router.push({name: 'follower'});
      },
      goToFollowee:function () {
        this.$router.push({name: 'followee'});
      },
      deleteVideo(id){
        this.$http.delete(`http://localhost:9099/api/videos/${id}`).then((response) => {

          this.videos.shift(response.data[0])
        })
      }
    },
    mounted(){

      //更新DOM
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.videosWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
        ;
      }),

        this.$http.get('http://localhost:9099/api/videos/thumbcount/currUser').then((response) => {
          this.likeCount = response.data.likeCount;
          this.dislikeCount = response.data.dislikeCount;
        }),

        this.$http.get('http://localhost:9099/api/videos/currUser').then((response) => {
          this.videos = response.data;
          console.log(this.videos)
        })

      this.$http.get('http://localhost:9099/api/users/currUser').then((response) => {
        this.currUser = response.data;
        console.log(this.currUser)
      })
      this.$http.get('http://localhost:9099/api/users/follower').then((response) => {
        this.followers = response.data;
        console.log(this.followers)
      })
      this.$http.get('http://localhost:9099/api/users/followee').then((response) => {
        this.followees = response.data;
        console.log(this.followees)
      })
    },
    components: {
      mvideo
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .me
    margin-top: 20px;
    position fixed
    bottom 56px
    left:0
    right:0
    top: 64px
    .up
      position fixed
      left:0
      right:0
      .avatar,.username,.logout
        display: flex
        justify-content center
        margin-bottom 10px
      .thumbCount
        text-align center
        .likeCount
          margin-right 10px
      .follow
        text-align: center
        span
          margin-right 10px
      .mu-item-wrapper
        z-index:999
    .videoswrapper
      position fixed
      bottom: 0
      left:0
      right:0
      top: 260px
      .videos
        .wordname
          height: 32px;
          font-size: 16px;
          color: #7e57c2;
          padding: 5px;
          padding-left: 20px;
          background #fff
          button
            float: right
            top: -7px;
            right: -15px;


</style>
