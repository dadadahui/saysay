<template>
  <div class="video">
    <div class="user">
      <img :src="video.author.avatar" class="avatar">
      <span class="username">{{video.author.username}}</span>
    </div>


    <div class="word" @click="goTo(video.word.wordname)">
      <span class="word-name">{{video.word.wordname}}</span>
      <!--<span class="video-num">{{video.word.videosCount}}</span>-->
    </div>


    <div class="video">
      <!--<video :src="video.url" controls @play="playVideo($event)" ref="video"></video>-->
      <video :src="video.url" @play="playVideo($event)"
             id="my-player"
             class="video-js vjs-big-play-centered"
             controls
             preload="auto"
             poster="//vjs.zencdn.net/v/oceans.png"
             data-setup='{}'>
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
        </p>
      </video>
      <div class="thumb">
        <div class="like" @click="like(video,$event)">{{video.likeCount}}</div>
        <div class="dislike" @click="dislike(video,$event)">{{video.dislikeCount}}</div>
      </div>
      <div class="views">{{video.views}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default{

    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
