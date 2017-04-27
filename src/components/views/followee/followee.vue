<template>
  <div class="follow">
    <!--关注列表-->
    <mu-list-item :title="followee.username" v-for="followee in followees">
      <mu-avatar src="https://image.flaticon.com/icons/svg/145/145852.svg" slot="leftAvatar"/>
      <mu-icon value="info" slot="right"/>
    </mu-list-item>
  </div>
</template>

<script type="text/ecmascript-6">
    export default{
      data(){
        return {

          followees:[]
        }
      },
      mounted(){
        //当前用户

        this.$http.get('http://localhost:9099/api/users/followee').then((response) => {
          this.followees = response.data;
          console.log(this.followees)
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
