<template>
  <div id="app">
    <vhead></vhead>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import vhead from './components/vhead/vhead'
import tab from './components/tab/tab'
export default {
  name: 'App',
  components:{
    vhead,
    tab
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
