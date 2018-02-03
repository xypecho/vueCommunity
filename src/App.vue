<template>
  <div id="app">
    <vhead></vhead>
    <router-view></router-view>
    <footnav></footnav>
  </div>
</template>

<script>
import vhead from './components/vhead/vhead'
import tab from './components/tab/tab'
import footnav from './components/footnav/footnav'
import Vue from 'vue'
export default {
  name: 'App',
  data(){
    return{
      Bus:new Vue()
    }
  },
  components:{
    vhead,
    tab,
    footnav
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData:function(){
      this.$http({
        methods:'get',
        url:'https://www.vue-js.com/api/v1/topics',
        params:{
          page:1,
          tab:'ask',
          limit:20,
          mdrender:true
        }
      }).then(function(data){
        //console.log(data);
      })
    }
  }
}
</script>

<style>

</style>
