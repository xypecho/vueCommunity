<template>
	<div class="release">
			<div class="select_type">
				<h1>选择板块</h1>
				<select name="" id="" v-model='list'>
					<option v-for='(text,index) in lists' :value='index'>{{text}}</option>
				</select>
			</div>
			<div class="select_title">
				<h1>文章标题</h1>
				<input type="text" name="" placeholder="标题字数10字以上" v-model='title'>
			</div>
			<div class="select_content">
				<textarea v-model='content' placeholder="输入文本，支持markdown格式"></textarea>
			</div>
		<div class="publish" @click='setdata'>
			发布
		</div>
	</div>
</template>
<script>
	import marked  from 'marked'
	export default{
		data(){
			return{
				list:0,
				lists:['分享', '问答', '招聘'],
				title:'',
				tab:'',
				content:''
			}
		},
		methods:{
			setdata:function(){
				let accesstoken=localStorage.getItem('accesstoken');
				if (this.list === 0) {
				    this.tab = 'share'
				} else if (this.list === 1) {
				    this.tab = 'ask'
				} else if (this.list === 2) {
				    this.tab = 'job'
				}
				this.content = marked(this.content);
				console.log(this.title,this.tab,this.content);
				this.$http.post('https://www.vue-js.com/api/v1/topics',{accesstoken:accesstoken,title:this.title,tab:this.tab,content:this.content}).then(function(data){
					console.log(data);
					if (data.body.success) {
						alert('发布成功');
					}else{
						alert('发布失败');
					}
				},function(data){
					if (data.status==403) {
						alert('请先登录');
						this.$router.push({path:'/personal'});
					}
				});
			}
		}
	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
	body
		background-color:#fff!important
	.release
		// position:relative
		.release_title
			height:40px
			line-height:40px
			background-color:#31c27c
			color:#fff
			font-size:16px
			text-align:center
		.select_type,.select_title
			padding:0 20px
			h1
				color:rgba(0,0,0,.54)
				font-size:12px
			select
				border:none
				border-bottom:1px solid #ccc
				width:100%
				outline:none
				background-color:#fff
				option
					border:none
					outline:none
		.select_title
			margin-top:30px
			input
				border:none
				border-bottom:1px solid #ccc
				box-sizing:border-box
				width:100%
				outline:none
		.select_content
			margin-top:30px
			padding:0 20px
			textarea
				width:100%
				outline:none
				resize:none
				height:180px
				border:1px solid #ccc
		.publish
			height:40px
			line-height:40px
			background-color:#31c27c
			text-align:center
			color:#fff
			width:100%
			position:absolute
			bottom:61px
</style>