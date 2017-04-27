<template>
  <div class="user">
    <div class="up">
      <div class="avatar">
        <mu-avatar slot="left" :size=60 src="https://image.flaticon.com/icons/svg/145/145852.svg"/>
      </div>
      <div class="username">
        {{user.username}}
      </div>
      <div class="thumbCount">
        <span class="likeCount"><span class="iconfont icon-zancheng" ></span>{{likeCount}}</span>
        <!--<span class="dislikeCount"><span class="iconfont icon-fandui" ></span>{{dislikeCount}}</span>-->
      </div>
      <div class="follow">
        <mu-flat-button @click="follow" label="follow" class="demo-flat-button" v-show="followFlagShow"/>
        <mu-flat-button @click="unfollow" label="unfollow" class="demo-flat-button" v-show="!followFlagShow"/>
      </div>
      <mu-divider/>
    </div>
    <div class="videoswrapper" ref="videosWrapper">
      <ul class="videos">
        <li v-for="video of videos">
          <div class="wordname" >
            <span @click="goTo(video.word.wordname)">{{video.word.wordname}}</span>
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
        user:{},
        likeCount: '',
        dislikeCount: '',
        videos: [],
        followFlagShow:true,

      }
    },
    computed: {
      userId: function () {
        return this.$route.params.userId
      },
    },
    methods: {
      follow:function(){
        this.$http.post(`http://localhost:9099/api/users/follow`,{
          userId:this.userId
        }).then((response)=>{
          console.log(response.data);
          this.followFlagShow = false;
        });
      },
      unfollow:function(){
        this.$http.post(`http://localhost:9099/api/users/unfollow`,{
          userId:this.userId
        }).then((response)=>{
          console.log(response.data);
          this.followFlagShow = true;

        });
      },
      goTo: function (wordname) {
        this.$router.push({name: 'wordDetail', params: {wordname: wordname}});
      },

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
        };
      }),

        this.$http.get(`http://localhost:9099/api/videos/thumbcount/${this.userId}`).then((response) => {
          this.likeCount = response.data.likeCount;
          this.dislikeCount = response.data.dislikeCount;
        }),

        this.$http.get(`http://localhost:9099/api/videos/${this.userId}`).then((response) => {
          this.videos = response.data;
          console.log(this.videos)
        })

      this.$http.get(`http://localhost:9099/api/users/${this.userId}`).then((response) => {
        this.user = response.data
      })

    },
    components: {
      mvideo
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .user
    margin-top: 20px;
    position fixed
    bottom 56px
    left:0
    right:0
    top: 56px
    .up
      position fixed
      left:0
      right:0
      .avatar,.username,.logout
        display: flex
        justify-content center
        margin-bottom 10px

      .follow
        text-align: center
      .thumbCount
        text-align center
        .likeCount
          margin-right 10px
    .videoswrapper
      position fixed
      bottom: 0
      left:0
      right:0
      top:240px
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
