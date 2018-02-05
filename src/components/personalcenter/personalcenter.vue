<template>
	<div class="personalcenter">
		<img :src="persondata.avatar_url">
		<p>{{userinfo.loginname}}</p>
		<span>注册于:{{userinfo.create_at | formate}}</span>
		<span class="score">积分{{userinfo.score}}</span>
		<div class="user_list">
			<div class="user_list_child" @click='changearrow'>
				<span>最近主题</span>
				<span>{{userinfo.recent_topics.length}}个</span>
				<span v-show='!uparrow'><img src="./下箭头.png" width="20"></span>
				<span v-show='uparrow'><img src="./上箭头.png" height="20"></span>
			</div>
			<div class="user_list_child" @click='changearrow'>
				<span>最近回复</span>
				<span>{{userinfo.recent_replies.length}}个</span>
				<span v-show='!uparrow'><img src="./下箭头.png" width="20"></span>
				<span v-show='uparrow'><img src="./上箭头.png" height="20"></span>
			</div>
			<div class="user_list_child" @click='changearrow'>
				<span>收藏主题</span>
				<span>{{userinfo.collect_topics.length}}个</span>
				<span v-show='!uparrow'><img src="./下箭头.png" width="20"></span>
				<span v-show='uparrow'><img src="./上箭头.png" height="20"></span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	data () {
	 return {
	 	userinfo:{},
	 	uparrow:false
	 }
	},
	mounted(){
		this.getuserinfo();
	},
	filters:{
		formate:function(value){
			let d=new Date();
			return value;
		}
	},
	methods:{
		getuserinfo:function(){
			let accesstoken=localStorage.getItem('accesstoken');
			let user =localStorage.getItem('loginname');
		    this.$http({
		      methods:'get',
		      url:`https://www.vue-js.com/api/v1/user/${user}`
		    }).then(function(data){
		      this.userinfo=data.body.data;
		      console.log(this.userinfo);
		    })
		},
		changearrow:function(){
			this.uparrow=!this.uparrow;
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
	body
		background-color:#f8f8f8
	.personalcenter
		padding:20px
		text-align:center
		img
			border-radius:50%
		p
			color:#31c27c
			font-weight: 700
			font-size: 24px
			line-height:0
		span
			font-size:13px
		.score
			margin-left:20px
		.user_list
			.user_list_child
				display:flex
				background-color:#31c27c
				height:30px
				margin-top:10px
				line-height:30px
				border-radius:30px
				padding:10px 10px 10px 10px
				color:#fff
				span
					font-size:15px
					flex:1
					text-align:center
					line-height:30px
					img
						vertical-align:middle
				&:nth-child(1)
					text-align:left

</style>