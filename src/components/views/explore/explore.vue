<template>
  <div class="explore" ref="listWrapper">
    <div class="list">
      <mu-list>
        <mu-list-item :title="word.wordname" v-for="word in words"
                      :to=" {name: 'wordDetail', params: { wordname:  word.wordname}}"
        >
        </mu-list-item>
      </mu-list>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  export default{
    data() {
      return {
        words: [],
        selectedWord: {},
      };
    },
    methods: {
      deleteWord(id){
        console.log(id)
        this.$http.delete(`/words/${id}`).then((response) => {
          this.$http.get('/api/words').then((response) => {
            this.words = response.data;
          })
        });
      }
    },
    created(){
      this.classMap = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7'];
    },
    mounted(){
      this.$http.get('/words').then((response) => {
        this.words = response.data;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listWrapper, {
              cancelable: true,
              click: true
            })
          } else {
            this.scroll.refresh();
          };
        })
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  @import "../../../common/stylus/iconfont.styl"


  .explore
    position fixed
    top: 56px
    left: 0
    bottom 56px
    width 100%
    overflow hidden

    .word
      box-sizing border-box
      padding 0 16px 0 16px
      color: #fff
      font-size 20px
      &:first-child
        margin-top: 10px;
      margin-bottom 10px
      height 56px
      background greenyellow
      &.bg1
        background #63D930
      &.bg2
        background #4154B2
      &.bg3
        background #FC0E1C
      &.bg4
        background #498BC8
      &.bg5
        background #B6A922
      &.bg6
        background: #E62464
      &.bg7
        background: #149747



</style>
