<template>
  <div class="main">
    <!--<mt-header title="Say" slot="left">-->
      <!--<router-link to="/search" slot="right">-->
        <!--<mt-button icon="search"></mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->
    <mu-appbar title="Say">
      <!--<mu-icon-button icon="menu" slot="left"/>-->
      <!--<mu-flat-button label="expand_more" slot="right"/>-->
      <!--<mu-flat-button href="333" label="expand_more" slot="right"/>-->
      <mu-icon-button icon="search" to="/search" slot="right"/>
    </mu-appbar>


    <mu-paper>
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item  :to=" {name: 'home'}" value="Home" title="Home" icon="home"/>
        <mu-bottom-nav-item  :to=" {name: 'explore'}" value="Explore" title="Explore" icon="explore"/>
        <mu-bottom-nav-item  :to=" {name: 'me'}" value="Me" title="Me" icon="person"/>
      </mu-bottom-nav>
    </mu-paper>
    <!--<keep-alive>-->
      <router-view></router-view>
    <!--</keep-alive>-->
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
