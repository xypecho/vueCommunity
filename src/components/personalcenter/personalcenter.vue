<template>
	<div class="personalcenter">
		<img :src="persondata.avatar_url">
	</div>
</template>
<script>
	export default {
	data () {
	 return {
	 	
	 }
	},
	created(){
		this.getuserinfo();
	},
	methods:{
		getuserinfo:function(){
			let accesstoken=localStorage.getItem('accesstoken');
			let user =this.persondata.loginname;
			console.log('开始获取用户信息');
			console.log(user);
		    this.$http({
		      methods:'get',
		      url:'https://www.vue-js.com/api/v1',
		      params:{
		      	user:user
		      }
		    }).then(function(data){
		      console.log(data);
		    })
		}
	},
	computed: {
	 persondata () {
	 return this.$store.state.persondata
	 }
	}
	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
	.personalcenter
		padding:20px
		text-align:center
		img
			border-radius:50%
</style>