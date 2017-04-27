<template>
  <div class="home">
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="hot">
        <div class="content" ref="contentWrapper">
          <ul id="container">
            <li v-for = "(video,index) in newVideos" class="item">
              <mu-card-header :title="video.author.username" subTitle="nice to meet you !">
                <!--<span class="user" >-->
                  <mu-avatar src="https://image.flaticon.com/icons/svg/145/145852.svg" slot="avatar" @click="goTo1(video.author.id)"/>
                <!--</span>-->
                <!--<span  class="follower" @click.stop.self.prevent="follower(video.author.id)" v-show="!notCurrUser(video.author.id) && followShow">关注</span>-->
                <!--<span class="unfollow" @click.stop.self.prevent="unfollow(video.author.id)" v-show="!notCurrUser(video.author.id) && unfollowShow">取消关注</span>-->
                <span class="word-name" @click="goTo(video.word.wordname)">{{video.word.wordname}}</span>
              </mu-card-header>
              <mvideo :video="video" @show-comment = "showComment(index)"></mvideo>
              <comment :videoId="video.id"  ref="comment"></comment>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>


  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";

  import comment from "components/comment/comment";
  import mvideo from "components/video/video";


  export default{
      data() {
        return {
          selected: 'hot',
          newVideos:[],
          currUserId:'',
          followShow:true,
          unfollowShow:false
        };
      },

      methods:{
        follow:function(id){
          this.$http.post(`http://localhost:9099/api/users/follow`,{
            userId:id
          }).then((response)=>{
            console.log(response.data);
            this.followShow = false;
            this.unfollowShow = true;
          });
        },
        unfollow:function(id){
          this.$http.post(`http://localhost:9099/api/users/unfollow`,{
            userId:id
          }).then((response)=>{
            console.log(response.data);
            this.followShow = true;
            this.unfollowShow = false;
          });
        },
        notCurrUser:function(id){
          return  id == this.currUserId;
        },
        goTo:function (wordname) {
          this.$router.push({ name: 'wordDetail', params: { wordname: wordname }});
        },
        goTo1:function (userId) {
          this.$router.push({ name: 'user', params: { userId: userId }});
        },
        deleteVideo(id){
            this.$http.delete(`http://localhost:9099/api/videos/${id}`).then((response)=>{
              window.location.reload()
          });
        },
        showComment(index){
          this.$refs.comment[index].show();
        }
      },
      created(){
        let vm = this;
        this.$http.get('http://localhost:9099/api/videos/new').then((response)=>{
          vm.newVideos = response.data;
        });
         this.$http.get('http://localhost:9099/api/users/currUser').then((response)=>{
          this.currUserId = response.data.objectId;
          return
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

        })
      },
components:{
  comment,
  mvideo
}


    };
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
    text-align center

  .home
    .content
      position fixed
      top: 56px
      bottom 55px
      left: 0
      width:100%
      overflow: hidden
      background #fff
     .item
        position relative
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

        .word-name
          font-size: 18px;
          float: right;
          color #7E57C2



</style>
