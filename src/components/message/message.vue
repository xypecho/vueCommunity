<template>
	<div class="message">
		<div class="message_tab">
			<ul>
				<li :class="isShow==0?'active':''" @click='toggleTab(0)'>未读消息</li>
				<li :class="isShow==1?'active':''" @click='toggleTab(1)'>已读消息</li>
			</ul>
		</div>
		<div class="message_cont">
			hello world
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				isShow:0
			}
		},
		methods:{
			toggleTab:function(idx){
				this.isShow=idx;
				let accesstoken =localStorage.getItem('accesstoken');
				console.log(accesstoken);
				this.$http({
					methods:'get',
					url:`https://www.vue-js.com/api/v1/messages?accesstoken=${accesstoken}`
				}).then(function(data){
					console.log(data);
				})
			}
		}
	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
	.message
		.message_tab
			ul
				display:flex
				width:100%
				height:40px
				line-height:40px
				padding:0
				margin:0
				background-color:#31c27c
				font-size:16px
				li
					list-style:none
					flex:1
					text-align:center
					color:hsla(0,0%,100%,.7)
					&.active
						color:#fff
		.message_cont
			width:100%
			font-size:14px
</style>