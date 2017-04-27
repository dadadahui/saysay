<template>
  <div class="search">
    <mu-appbar title="Say">
      <mu-icon-button icon="backspace" @click="this.back" slot="left"/>
    </mu-appbar>
    <div class="content">
      <mu-auto-complete hintText="type a word.."   fullWidth v-model="value" @input="getWords" :dataSource="result"   @select="goTo"/>
      <mu-float-button v-show="showFlag" icon="add" class="demo-float-button" @click="addWord(value)"/>
      <mu-dialog :open="dialogOk" title="tips:" >
        add success!
        <mu-flat-button label="ok" slot="actions" primary @click="closeDialogOk"/>
      </mu-dialog>
      <mu-dialog :open="dialogWrong" title="tips:" >
        please type a word first ~
        <mu-flat-button label="ok" slot="actions" primary @click="closeDialogWrong"/>
      </mu-dialog>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        result:[],
        value:'',
        dialogOk: false,
        dialogWrong:false
      }
    },
    computed:{
      showFlag:function () {
        return !!!this.result.length
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      closeDialogOk () {
        this.dialogOk = false
      },
      closeDialogWrong () {
        this.dialogWrong = false
      },
      getWords(val){
        let vm = this;

        vm.$http.get(`http://localhost:9099/api/words/${val}`).then((response) => {
          vm.result =  response.data;
          if (vm.result.length){
            vm.result = []
            response.data.forEach(v=>{
              vm.result.push(v.wordname);
            })

          console.log(vm.result)

        }})

      },
      addWord(wordname){
        if(wordname.length !== 0){
          this.$http.post(`http://localhost:9099/api/words`,{
            'wordname':wordname
          }).then((response) => {
            console.log(response)
            this.dialogOk = true
          })
        }else{
          this.dialogWrong = true
        }

      },
      goTo(wordname){
          this.$router.push({name: 'wordDetail', params: {wordname: wordname}});
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search
    display: flex
    position fixed
    left:0
    top:0
    bottom:0
    width:100%
    background #fff
    .mu-icon
      font-size 20px
    .content
      width:100%
      display: flex
      position absolute
      top: 80px
      padding 10px
      bottom:0
</style>
