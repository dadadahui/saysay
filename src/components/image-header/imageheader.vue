<template>
 <div class="image-header">
   <router-link  to="/startup">
     <i class="icon-back back"></i>
   </router-link>
   <img src="./header.png">
   <div class="title">Say</div>
 </div>
</template>

<script type="text/ecmascript-6">
    export default{

    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

.image-header
  position relative
  width:100%
  height 300px

  .back
    position absolute
    top: 10px
    left: 10px
    font-family iconfont
    z-index:999

  .title
    position absolute
    color:rgba(126, 87, 194, 0.5);
    font-size 16em
  img
    position absolute
    left:0
    top:0
    width:100%
    height 100%



</style>
