<template>
  <div class="main">

    <mu-appbar title="Say">

      <mu-icon-button icon="search" to="/search" slot="right"/>
    </mu-appbar>


    <mu-paper>
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item  :to=" {name: 'home'}" value="Home" title="Home" icon="home"/>
        <mu-bottom-nav-item  :to=" {name: 'explore'}" value="Explore" title="Explore" icon="explore"/>
        <mu-bottom-nav-item  :to=" {name: 'me'}" value="Me" title="Me" icon="person"/>
      </mu-bottom-nav>
    </mu-paper>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  data: function () {
    return {
      bottomNav: 'Home'
    }
  },
  methods:{
    goTo:function (name) {
      this.$router.replace({name:val});
    },
    handleChange (val) {
      this.bottomNav = val
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .main
    position fixed
    left:0
    top:0
    bottom:0
    width:100%
    background #fff
    .mint-header
      background-color #e91e63
    .mint-header-title
      font-size 20px
    .mintui-search
      font-size 20px
    .mu-paper
      width: 100%
      position fixed
      bottom:0
      z-index 999



</style>
