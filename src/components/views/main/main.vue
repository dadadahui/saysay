<template>
  <div class="main">
    <mt-header title="Say" slot="left">
      <router-link to="/search" slot="right">
        <mt-button icon="search"></mt-button>
      </router-link>
    </mt-header>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="home" @click.native="goTo('home')">
        <i slot="icon" class="iconfont icon-home"></i>
        home
      </mt-tab-item>
      <mt-tab-item id="explore" @click.native="goTo('explore')">
        <i slot="icon" class="iconfont icon-explore"></i>
        explore
      </mt-tab-item>
      <mt-tab-item id="me" @click.native="goTo('me')">
        <i slot="icon" class="iconfont icon-me"></i>
        me
      </mt-tab-item>
    </mt-tabbar>


    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  data: function () {
    return {
      selected: 'home'
    }
  },
  methods:{
    goTo:function (name) {
      this.$router.replace({name:name});
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
    .iconfont
      font-size 24px
    .mint-tabbar
      z-index:999


</style>
