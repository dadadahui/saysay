<template>
  <div class="comment" v-show="showFlag">
    <div class="bg"></div>
    <div class="commentsWrapper" >
      <div ref="commentsWrapper">
        <div class="commentsContainer">
          <ul>
            <li v-for="comment in comments" >
              <span class="author">{{comment.author.username}}：</span>
              <span class="content">{{comment.content}}</span>
            </li>
          </ul>
        </div>
        <input type="text" v-model="content">
        <div class="add" @click="addComment($event)">send</div>
        <div class="close" @click="hide">x</div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";

  export default{
    props: {
      videoId: {
        type: String
      }
    },
    data(){
      return {
        comments: [],
        showFlag:false,
        content:''
      }
    },
    methods:{
      addComment:function (event) {
        let vm = this;
        let newObj = {};
        this.$http.post(`/comments`,{
          videoId:this.videoId,
          content:this.content
        }).then((response) => {

          if (response.status == 200){

            vm.getCommentsByVideo().then(results=>{
              let data = results.data;

              vm.comments.unshift(data[0]);
            })
          }else
            if (response.data.errno == 332){
            this.$router.replace('/')
          }

        })

      },
      show:function () {
        this.showFlag = true;
      },
      hide:function () {
        this.showFlag = false;
      },
      getCommentsByVideo:function () {
       return this.$http.get(`/comments/${this.videoId}`)
      }
    },
    mounted(){
      this.getCommentsByVideo().then((response) => {
        this.comments = response.data;
      }),
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.commentsWrapper, {
            // eventPassthrough:'vertical'
          })
        } else {
          this.scroll.refresh();
        };
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .comment
    .bg
      position absolute
      top: 0
      bottom 0
      left: 0
      right 0
      overflow: hidden
      background #000
      opacity 0.7
  .commentsWrapper
      position absolute
      top: 0
      bottom 0
      left: 0
      right 0
      overflow: hidden
      z-index 10
      padding 10px
    .commentsContainer
      position absolute
      top:0
      left 0
      right:0
      bottom: 48px
      padding 10px
      ul
        li
          margin-top: 25px
          color: #f5f2f0
          font-size: 16px
          display: flex
          .author
            margin-right 10px

    input
      position absolute
      bottom: 10px
      left: 10px
      width: 60%;
      height: 30px;
      background: #ffffff;
      text-indent: 10px;
    .add
      position absolute
      bottom: 19px
      right: 10px
      color: #fff
    .close
      position absolute
      top: 10px
      right: 10px
      color #fff
      font-size 20px

</style>
