<template>
  <div class="follow">
    <!--关注列表-->
    <mu-list-item :title="follower.username" v-for="follower in followers" >
      <mu-avatar src="https://image.flaticon.com/icons/svg/145/145852.svg" slot="leftAvatar"/>
      <mu-icon value="info" slot="right"/>
    </mu-list-item>
  </div>
</template>

<script type="text/ecmascript-6">
    export default{
      data(){
        return {
          followers:[],
        }
      },
      methods:{

      },
      mounted(){
        //当前用户
        this.$http.get('http://localhost:9099/api/users/follower').then((response) => {
          this.followers = response.data;
          console.log(this.followers)
        })

      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .follow
    margin-top: 20px;
    position fixed
    bottom 56px
    left:0
    right:0
    top: 64px
</style>
