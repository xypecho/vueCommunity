<template>
	<div class="personalcenter">
		<div class="content">
			<img :src="userinfo.avatar_url">
			<p>{{userinfo.loginname}}</p>
			<span>注册于:{{userinfo.create_at | formate}}</span>
			<span class="score">积分{{userinfo.score}}</span>
			<div class="user_list">
				<div class="user_list_child" @click='changearrow(1)'>
					<span>最近主题</span>
					<span>{{userinfo.recent_topics.length}}个</span>
					<span :class="uparrow==1?'uparrow':''"><img src="./下箭头.png" width="20"></span>
				</div>
				<div class="user_list_son" :class="uparrow==1?'uparrow':''">
					<p v-for='item in userinfo.recent_topics' @click='pushinto(item.id)'>{{item.title}}</p>
				</div>
				<div class="user_list_child" @click='changearrow(2)'>
					<span>最近回复</span>
					<span>{{userinfo.recent_replies.length}}个</span>
					<span :class="uparrow==2?'uparrow':''"><img src="./下箭头.png" width="20"></span>
				</div>
				<div class="user_list_son" :class="uparrow==2?'uparrow':''">
					<p v-for='item in userinfo.recent_replies' @click='pushinto(item.id)'>{{item.title}}</p>
				</div>
				<div class="user_list_child" @click='changearrow(3)'>
					<span>收藏主题</span>
					<span>{{userinfo.collect_topics.length}}个</span>
					<span :class="uparrow==3?'uparrow':''"><img src="./下箭头.png" width="20"></span>
				</div>
				<div class="user_list_son" :class="uparrow==3?'uparrow':''">
					<p v-for='item in userinfo.collect_topics' @click='pushinto(item.id)'>{{item.title}}</p>
				</div>
			</div>
			<p @click='signOut'>退出登录</p>
		</div>
		<showdetail :showdetail='selectList' ref='showdetail'></showdetail>
	</div>
</template>
<script>
	import showdetail from '../showdetail/showdetail'
	export default {
	data () {
	 return {
	 	userinfo:{
	 		recent_topics: [],
	 		recent_replies:[],
	 		collect_topics:[]
	 	},
	 	uparrow:-1,
	 	selectList:0
	 }
	},
	components:{
		showdetail
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
			if (!accesstoken) {
				this.$router.push({path:'/personal'});
				return false;
			}
			let user =localStorage.getItem('loginname');
		    this.$http({
		      methods:'get',
		      url:`https://www.vue-js.com/api/v1/user/${user}`
		    }).then(function(data){
		      this.userinfo=data.body.data;
		      console.log(this.userinfo);
		    })
		},
		changearrow:function(id){
			if(this.uparrow==id){
				this.uparrow=-1;
			}else{
				this.uparrow=id;
			}
		},
		pushinto:function(id){
			console.log(id);
			this.selectList=id;
			this.$refs.showdetail.show();
			// this.$router.push({path:'/showdetail',query: {id}});
		},
		signOut:function(){
			localStorage.clear();
			window.location.reload();
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
		overflow:hidden
	.content
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
					&.uparrow
						display:block
						img
							transform:rotate(180deg)
				&:nth-child(1)
					text-align:left
			.user_list_son
				display:none
				p
					font-size:14px
					font-weight:100
					text-align:left
					padding-left:60px
					width:180px
					text-overflow:ellipsis
					white-space:nowrap
					padding-top:10px
					overflow:hidden
					height:10px
				&.uparrow
					display:block
</style>