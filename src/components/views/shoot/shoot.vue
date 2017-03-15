<template>
  <div class="shoot">
    <video  autoplay ref="video"></video>
    <button class="start" v-show = "startFlag" @click.stop="startRecording">start</button>
    <button class="stop" v-show = "!startFlag" @click.stop="stopRecording">stop</button>
    <button class="publish" @click="saveToCloud" ref="anchor">publish</button>
  </div>
</template>

<script type="text/ecmascript-6">

  export default{
    data(){
      return {
        mediaStream: Object,
        recoder: Object,
        startFlag: true,
        videoBlob: Object,
        url: '',
        word: 'bye'
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
        this.recorder = new MediaRecorder(vm.mediaStream);
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
      addWord(){
        this.$http.post('http://localhost:9099/api/videos',
          {
            url: this.url,
            user: {
              username: "hhh",
            },
            wordname: 'bye',
            likeCount: '0',
            dislikeCount: '0',
            views: '0'
          }).catch(e => {
          console.error(e);
        }).then(function () {
          console.log('add success!')
        })
      },
      saveToCloud(){
        let vm = this;
        let reader = new FileReader();
        reader.readAsDataURL(this.videoBlob);
        reader.onloadend = function () {
          let base64data = {base64: reader.result};
          // let file = new AV.File('video.mp4', base64data);
          // file.save().then(function (file) {
          //   vm.url = file.url();
          //   vm.addWord();
          // });
        }


      }
    },
    mounted: function () {
      this.getMediaStream()
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shoot
  position fixed
  top: 40px
  left:0
  bottom 55px
  width 100%
  overflow hidden
  video
    width 100%
    height 200px
  button{
    width: 50px
    height 50px
    border-radius 50%

  }
</style>
