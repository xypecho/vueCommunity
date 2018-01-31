<template>
	<div class="footnav">
		<router-link to='/all' tag='div'>
			<div class="nav_child">
				<span class="icon"><img src="./home.png"></span>
				<span class="nav_name">首页</span>
			</div>
		</router-link>
		<router-link to='/release' tag='div' @click.native='hidenav'>
			<div class="nav_child">
				<span class="icon"><img src="./fabu.png"></span>
				<span class="nav_name">发布</span>
			</div>
		</router-link>
		<router-link to='/message' tag='div'>
			<div class="nav_child">
				<span class="icon"><img src="./xiaoxi.png"></span>
				<span class="nav_name">消息</span>
			</div>
		</router-link>
		<router-link to='/personal' tag='div'>
			<div class="nav_child">
				<span class="icon"><img src="./wo.png"></span>
				<span class="nav_name">我的</span>
			</div>
		</router-link>
	</div>
</template>
<script>
	export default{
		methods:{
			hidenav:function(){
				alert(123);
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.footnav
		position:fixed
		height:60px
		bottom:0
		left:0
		right:0
		width:100%
		border-top:1px solid #f0f0f0
		background-color:#fff
		display:flex
		div
			flex:1
			text-align:center
			margin:auto 0
			img
				height:24px
			span
				display:block
				font-size:14px
				line-height:20px
		.router-link-exact-active
			color:#31c27c
</style>