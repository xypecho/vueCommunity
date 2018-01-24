<template>
  <div id="app">
    
  </div>
</template>

<script>
export default {
  name: 'App',
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
        console.log(data);
      })
    }
  }
}
</script>

<style>

</style>
