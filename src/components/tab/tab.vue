<template>
	<div class="tab">
		<router-link to="/all" tag='div'>全部</router-link>
		<router-link to="/good" tag='div'>精华</router-link>
		<router-link to="/weex" tag='div'>weex</router-link>
		<router-link to="/share" tag='div'>分享</router-link>
		<router-link to="/ask" tag='div'>问答</router-link>
		<router-link to="/job" tag='div'>招聘</router-link>
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
	.tab
		width:100%
		height:40px
		font-size:0
		background-color:#f6f6f6
		display:flex
		div
			flex:1
			font-size:16px
			display:inline-block
			height:40px
			line-height:40px
			text-align:center
		.router-link-exact-active
			color:#fff
			background-color:#31c27c
</style>