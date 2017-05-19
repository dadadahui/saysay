<template>
  <div class="wordDetail">

    <div class="word">
      <span class="word-name">{{wordname}}</span>
      <span class="add-video" @click="goTo(wordname)">add a video</span>
    </div>
    <div class="videoList" ref="listWrapper">
      <ul>
        <li v-for="(video,index) in videos" class="item">

          <mu-card-header :title="video.author.username" subTitle="nice to meet you !">
            <mu-avatar src="https://image.flaticon.com/icons/svg/145/145852.svg" slot="avatar"/>
          </mu-card-header>
          <mvideo :video="video" @show-comment = "showComment(index)"></mvideo>
          <comment :videoId="video.id"  ref="comment"></comment>
        </li>
      </ul>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import mvideo from "components/video/video";
  import comment from "components/comment/comment";

  export default{

    data(){
      return {
        videos: [],
      }
    },

    computed: {
      wordname: function () {
        return this.$route.params.wordname
      },
    },
methods:{
    goTo(wordname){
      this.$router.push({name: 'shoot', params: {wordname: wordname}});
    },
    showComment(index){
      this.$refs.comment[index].show();
    }
  },
    created: function () {
      this.$http.get(`/videos/${this.wordname}`).then((response) => {
        this.videos = response.data;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh();
          };
        })
      });

    },
    components:{
      mvideo,
      comment
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
    top: 56px
    left: 0
    bottom 55px
    width 100%
    overflow hidden
    background #fff
    .word
      box-sizing border-box
      height: 50px
      padding 10px
      background #7E57C2
      display: flex
      color: #fff
      text-align: center;
      font-size 20px
      .word-name, .add-video
        flex: 1
    .videoList
      position fixed
      top: 106px
      left: 0
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
            vertical-align: -webkit-baseline-middle;

</style>
