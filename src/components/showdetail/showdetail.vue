<template>
	<div class="showdetail" v-show='showflag'>
		<div class="head">
			<img src="./left.png" height="25" @click='hide'>
			<span>{{showdetail_content.title}}</span>
		</div>
		<div class="content" v-html="showdetail_content.content">
			{{showdetail_content.content}}
		</div>
		<div class="split"></div>
		<div class="replies" v-for='(item,index) in showdetail_content.replies'>
			<div class="top">
				<span class="avatar">
					<img :src="item.author.avatar_url" width="36" height="36">
				</span>
				<span class="username">{{item.author.loginname}}</span>
				<span class="floor">{{index+1}}楼</span>
				<div class="support" @click='givestar(index)'>
					<span class="icon-点赞" :class='isstar(index)'></span>
					<span class="support_num">{{item.ups.length}}</span>
				</div>
			</div>
			<div class="bottom" v-html='item.content'>
				{{item.content}}
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default{
		props:{
			showdetail:{
				
			}
		},
		data(){
			return{
				showflag:false,
				showdetail_content:{
					type:Object
				},
				star:[],
				checked:false
			}
		},
		methods:{
			show(){
				this.showflag=true;
				this.getdata();
			},
			hide(){
				this.showflag=false;
			},
			givestar(idx){
				let reply_id=this.showdetail_content.replies[idx].id;
				let accesstoken=localStorage.getItem('accesstoken');
				this.$http.post(`https://www.vue-js.com/api/v1/reply/${reply_id}/ups`,{accesstoken}).then(data=>{
					//console.log(this.showdetail_content.replies);
					// console.log(data);
					if (data.body.action=='up') {
						this.showdetail_content.replies.forEach((val,key)=>{
							this.showdetail_content.replies[idx].checked=true;
							console.log(val);
						})
						this.getdata();
					}else{
						this.showdetail_content.replies.forEach((val,key)=>{
							this.showdetail_content.replies[idx].checked=false;
							console.log(val);
						})
						this.getdata();
					};
				})
			},
			isstar(idx){
				for(let val of this.showdetail_content.replies){
					Vue.set(val,'checked',false);
					//console.log(val.checked);
				}
			},
			getdata(){
				this.$nextTick(()=>{
					this.$http({
						methods:'post',
						url:`https://www.vue-js.com/api/v1/topic/${this.showdetail}`,
						params:{
							mdrender:true
						}
					}).then(function(data){
						data=data.body.data;
						this.showdetail_content=data;
						//console.log(this.showdetail_content.replies);
					})
				})
			}
		}
	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
	.showdetail
		position:fixed
		top:0
		left:0
		z-index:7
		background-color:#fff
		width:100%
		height:100%
		transform:translate3d(0,0,0)
		transition:all 0.4s linear
		overflow-y:scroll
		overflow-x:hidden
		.head
			width:100%
			height:44px
			line-height:44px
			background-color:#1c6132
			img
				vertical-align:middle
			span
				color:#fff
		.content
			padding :15px
			overflow-x:hidden
			a
				text-decoration:none
				color:black
			h2
				border-bottom: 1px solid #eee
				padding-bottom:15px
		.split
			height:20px
			background-color:#ededed
			clear:both
		.replies
			border-bottom: 1px solid #f0f0f0
			padding:15px
			.top
				display:block
				height:36px
				line-height:36px
				.avatar
					display:inline-block
					width:36px
					height:36px
				.username
					display:inline-block
					color: #666
					font-weight: 700
					font-size:16px
					vertical-align:top
					margin-left:8px
				.floor
					display:inline-block
					font-size:14px
					color:#31c27c
					height:36px
					line-height:36px
					vertical-align:top
					margin-left:8px
				.support
					display:inline-block
					float:right
					color:#08c
					height:36px
					line-height:36px
					img
						vertical-align:sub
					.support_num
						display:inline-block
						font-size:14px
						height:36px
						line-height:36px
					.icon-点赞
						height:20px
						&.active_star
							color:red!important
</style>