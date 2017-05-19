<template>
<div v-if="this.currUser" class="me">
  <div  class="up">
    <div class="avatar">
      <mu-avatar slot="left" :size=60 src="https://image.flaticon.com/icons/svg/145/145852.svg"/>
    </div>
    <div class="username">
      {{this.currUser.username}}
    </div>
    <div class="thumbCount">
      <span class="likeCount"><span class="iconfont icon-zancheng" ></span>{{likeCount}}</span>
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
      <li v-for="(video,index) of videos">
        <div class="wordname" >
          <span @click="goToWordDetail(video.word.wordname)">{{video.word.wordname}}</span>
          <mu-flat-button  class="demo-flat-button" primary icon="delete" @click="deleteVideo(video.id,index)"/>
        </div>
        <mvideo :video="video" @show-comment = "showComment(index)"></mvideo>
        <comment :videoId="video.id"  ref="comment"></comment>

      </li>
    </ul>
  </div>

</div>
  <div v-else class="btn-login">
    <mu-raised-button @click="this.logOut" label="login" class="demo-raised-button" primary />
  </div>
</template>

<script type="text/ecmascript-6">
  import mvideo from "components/video/video";
  import BScroll from "better-scroll";
  import comment from "components/comment/comment";


  export default{
    data(){
      return {
        currUser: {},
        likeCount: 0,
        videos: [],
        followers:[],
        followees:[]
      }
    },
    computed:{
      currUserId:function () {
        return this.currUser.objectId;
      }
    },
    methods: {
      logOut(){
        this.$http.post('/users/logout').then(
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
      deleteVideo(id,index){
        this.$http.delete(`/videos/${id}`).then((response) => {

          this.videos.shift(response.data[index])
        })
      },
      showComment(index){
        this.$refs.comment[index].show();
      }
    },

    mounted(){
      let vm = this;
      vm.$http.get(`/videos/currUser`).then((response) => {
        vm.videos = response.data;
        vm.$nextTick(() => {
          if (!vm.scroll) {
            vm.scroll = new BScroll(vm.$refs.videosWrapper, {
              click: true
            })
          } else {
            vm.scroll.refresh();
          };
        })
      })

      vm.$http.get(`/videos/likecount/currUser`).then((response) => {
        vm.likeCount = response.data.likeCount
      })

      vm.$http.get('/users/currUser').then((response) => {
        vm.currUser = response.data;
      })

      if(vm.currUser){
        vm.$http.get('/users/follower').then((response) => {
          vm.followers = response.data;
        })

        vm.$http.get('/users/followee').then((response) => {
          vm.followees = response.data;
        })
      }


    },
    components: {
      mvideo,
      comment
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


  .btn-login{
    margin: 50%
    transform translateX(-44px)
  }
</style>
