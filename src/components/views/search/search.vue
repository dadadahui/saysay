<template>
  <div class="search">

    <mt-search autofocus v-model.lazy="value" v-bind:blur="getWords()">
      <mt-cell
        v-for="(item,index) in result"
        :title="item.wordname"
        :to="{ name: 'wordDetail', params: { wordname:  item.wordname}}"
       >
        <span class="new" v-show="item.new" @click= "addWord(item.wordname)">+</span>
      </mt-cell>
    </mt-search>

  </div>
</template>

<script type="text/ecmascript-6">
  import {Search} from 'mint-ui';

  export default{
    data(){
      return {
        value:'',
        result:[]
      }
    },

    methods:{
      getWords(){
        let vm = this;
        let isExisted = false;//不存在
        vm.$http.get(`http://localhost:9099/api/words/${this.value}`).then((response) => {
          vm.result =  response.data;
          vm.result.forEach(v=>{
            if (v.wordname == vm.value){
              isExisted = true;
            }else{
              isExisted = false;
            }
          })
          if (!isExisted){
            vm.result.unshift({
              'wordname':vm.value,
              'new':true
            })
          }

        })

      },
      addWord(wordname){
        this.$http.post(`http://localhost:9099/api/words`,{
          'wordname':wordname
        }).then((response) => {
          console.log(response)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search
    position fixed
    left:0
    top:0
    bottom:0
    width:100%
    background #fff
    .new
      position absolute
      z-index 999
</style>
