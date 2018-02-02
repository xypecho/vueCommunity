<template>
	<div class="personal">
		<div class="personal_wrapper">
			<input v-model='accessToken' type="text" name="" placeholder="请输入accessToken">
			<p v-show='this.error_num==403'>该用户不存在，请重新输入</p>
			<span @click='login'>登录</span>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				accessToken:'',
				error_num:0
			}
		},
		methods:{
			login:function(){
				// 'Access Token: 35a006c7-dd2d-4c1e-b2ca-e127905cf9f8
				let accesstoken=this.accessToken;
				this.$http.post('https://www.vue-js.com/api/v1/accesstoken',
					{accesstoken}
				).then(data=>{
					this.error_num=0;
					console.log(data);
					this.$router.push({path:'/personalcenter'})
				},function(error){
					console.log(error);
					this.error_num=error.status;
				})
			}
		}
	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
	.personal
		//font-size:0
		text-align:center
		margin:0 auto
		.personal_wrapper
			margin-top:40%
			input
				font-size:14px
				outline:none
				border-radius:20px
				border:none
				border:1px solid #cccccc
				display:block
				height:30px
				line-height:30px
				text-align:center
				width:70%
				margin:20px auto
			p
				font-size:14px
				color:#f44336
			span
				margin-top:20px
				display:block
				font-size:14px
				height:30px
				line-height:30px
				background-color:#31c27c
				color:#fff
				width:70%
				border-radius:20px
				text-align:center
				margin:auto auto
</style>