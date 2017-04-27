<template>
  <div class="login">
    <imageheader></imageHeader>
    <div class="content">
      <mu-text-field  hintText="username" v-model="username"/><br/>
      <mu-text-field  hintText="password" v-model="password"/><br/>
      <mu-raised-button fullWidth @click="login" label="login" class="demo-raised-button" primary/>
      <mu-toast ref="mToast" v-if="toast" :message=this.message @close="hideToast"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import imageheader from "components/image-header/imageheader";

  const ERR_OK = 0;
  const ERR_Wrong = 1;

  export default{
    data :function () {
      return {
        username:'',
        password:'',
        toast: false,
        message:''
      }
    },

    methods:{
      showToast () {
        this.toast = true
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
       login() {
         this.$http.post('http://localhost:9099/api/users/login',
           {
            username:this.username,
            password:this.password
          }).then((response) => {
           let data = response.data;
           if (data.errno == ERR_OK) {
             this.message = '登陆成功'
             this.showToast()
             this.$router.push({name:'home'});
           } else if(data.errno == ERR_Wrong && data.err.code == 201){
              this.message = '密码错误'
             this.showToast()
           }else if(data.errno == ERR_Wrong && data.err.code == 211){
             this.message = '用户未注册'
             this.showToast()
            }
          });
      }

  },
    components:{
      imageheader
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login
    position fixed
    top:0
    left:0
    bottom:0
    width:100%
    background #fff
    .header
      position: absolute
      top:0
      left:0
      width:100%
    .content
       margin-top 40px
       text-align center
       color: #999
       button
        margin-top:20px
        width 70%
</style>
