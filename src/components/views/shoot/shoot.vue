<template>
  <div class="shoot" ref="videoWrap">
    <video  autoplay ref="video" loop></video>
    <button class="start" v-show = "startFlag" @click.stop="startRecording">start</button>
    <button class="stop" v-show = "!startFlag" @click.stop="stopRecording">stop</button>
    <button class="publish" @click="saveToCloud" ref="anchor" >publish</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
  export default{
    data(){
      return {
        mediaStream: Object,
        startFlag: true,
        videoBlob: Object,
        url: ''
      }
    },
    computed:{
      wordname:function () {
        return this.$route.params.wordname
      }
    },
    methods: {

      /*
       检测权限
       不同浏览器不一样，待研究...
       */
      hasGetUserMedia() {
        // Note: Opera builds are unprefixed.
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
      },
      getMediaStream(){
        let vm = this;
        if (this.hasGetUserMedia()) {
          navigator.getUserMedia({audio: true, video: true}, function (stream) {
            vm.mediaStream = stream;
            vm.$refs.video.srcObject = stream;
          }, function () {
            console.log('Reeeejected!', e);
          });
        } else {
          alert('getUserMedia() is not supported in your browser');
        }
      },
      startRecording(){
        let vm = this;
        vm.getMediaStream();
        this.recorder = new MediaRecorder(vm.mediaStream,{mimeType: 'video/webm;codecs=vp9'});
        this.recorder.start();
        this.recorder.ondataavailable = function (evt) {
          //录像结束时调用
          vm.videoBlob = new Blob([evt.data], {type: evt.data.type});
          let blobUrl = window.URL.createObjectURL(vm.videoBlob);
          vm.$refs.video.srcObject = null;
          vm.$refs.video.src = blobUrl;
        };
        this.startFlag = false;
        console.log('开始录像')
      },
      stopRecording(){
        if (this.recorder) {
          this.recorder.stop();
          // this.mediaStream = null;
          console.log("停止录像");
          this.startFlag = true;

        }
      },

      saveToCloud(){
        let vm = this;
        let reader = new FileReader();

          reader.readAsDataURL(this.videoBlob);

          reader.onloadend = function () {
            let base64data = {base64: reader.result};
            let file = new AV.File('video.webm', base64data);
            file.save().then(function (file) {
              vm.url = file.url();
              vm.$http.post('http://localhost:9099/api/videos',
                {
                  url: vm.url,
                  wordname: vm.wordname,
                  likeCount: '0',
                  dislikeCount: '0'
                }).then(function () {
                console.log('add success!')
              }).catch(e => {
                console.error(e);
              })
            });
            this.videoBlob = null;
          }
          let toast =  Toast({
            message: '跳转中~~',
            position: 'center',
            duration: 3000
          });

          setTimeout(function () {
            toast.close();
            vm.$router.go(-1);
          },3000);

      }
    },
    mounted: function () {
      this.getMediaStream();
      let videoWrap = this.$refs.videoWrap;
      videoWrap.style.width = window.innerWidth + 'px';
      videoWrap.style.height = window.innerHeight + 'px';
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shoot
  position relative
  top: 0
  left:0
  overflow hidden
  video
    position: absolute;
    left: 50%;
    top: 36%;
    z-index: 1;
    -webkit-transform: translate(-50%,-50%);
    -webkit-transform-origin: 50% 50%;
  button {
    position absolute
    z-index:2
    width: 60px
    height 60px
    border-radius 50%
    bottom: 112px;
    border:none
    background #b91667
    color: #fff
    &.start{
      left: 20%
    }
    &.stop{
      left: 20%
    }
    &.publish{
      right: 20%
    }
    &[disabled]{
      background #999
    }

  }
</style>
