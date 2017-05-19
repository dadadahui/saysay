<template>
    <div class="register">
      <imageheader></imageHeader>
      <div class="content">
        <mu-text-field  hintText="username" v-model="username"/><br/>
        <mu-text-field  hintText="password" v-model="password"/><br/>
        <mu-raised-button fullWidth @click="register" label="register" class="demo-raised-button" primary/>
        <mu-toast ref="mToast" v-if="toast" :message=this.message @close="hideToast"/>
      </div>

    </div>
</template>

<script type="text/ecmascript-6" >
  import imageheader from "components/image-header/imageheader";

  const ERR_OK = 0;
  const ERR_Wrong = 1;

  export default{
    data: function () {
      return {
        username: '',
        password: '',
        toast: false,
        message:''
      }
    },
    methods: {
      showToast () {
        this.toast = true
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      register(){
        this.$http.post('/users/signup',
          {
            username: this.username,
            password: this.password
          }).then((response) => {
          let data = response.data;
          if (data.errno == ERR_OK) {
            this.$router.push({name:'home'});
          }  else if(data.errno == ERR_Wrong && data.err.code == 202){
            this.message = '用户已注册，请登录'
            this.showToast()
          }
        })
      }

    },
    components: {
      imageheader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.register
  position fixed
  top:0
  left:0
  bottom:0
  width:100%
  background #fff
  .content
      margin-top 40px
      text-align center
      color: #999
      button
        margin-top:20px
        width 70%

</style>
