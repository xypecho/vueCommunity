<template>
	<div class="page">
		<div class="child" v-for='ltem in articleList'>
			<div class="avatar">
				<img :src="ltem.author.avatar_url">
			</div>
			<div class="info">
				<div class="tag" v-if="ltem.tab=='ask'">
					问答
				</div>
				<div class="tag" v-if="ltem.tab=='share'">
					分享
				</div>
				<div class="tag" v-if="ltem.tab=='weex'">
					weex
				</div>
				<div class="tag" v-if="ltem.tab=='job'">
					招聘
				</div>
				<div class="tag good" v-if="ltem.tab=='good'">
					精华
				</div>
				<!-- <div class="count">{{ltem.reply_count}}/{{ltem.visit_count}}</div> -->
				<div class="title">{{ltem.title}}</div>
			</div>
			<div class="time">{{ltem.create_at | formattime(ltem.last_reply_at)}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				articleList:[]
			}
		},
		mounted(){
		  this.getData();
		},
		filters:{
			formattime:function(val,last_reply_at){
				val=Date.parse(val);
				last_reply_at=Date.parse(last_reply_at);
				console.log(val,last_reply_at);
				return val;
			}
		},
		methods:{
		  getData:function(){
		    this.$http({
		      methods:'get',
		      url:'https://www.vue-js.com/api/v1/topics',
		      params:{
		        page:1,
		        tab:'good',
		        limit:20,
		        mdrender:true
		      }
		    }).then(function(data){
		      console.log(data);
		      this.articleList=data.body.data;
		    })
		  }
		}
	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
	.page
		padding :10px 15px
		.child
			background-color:#fff
			height:50px
			display:flex
			line-height:50px
			border-bottom:1px solid #f0f0f0
			.avatar
				flex:0 0 50px
				position:relative
				img
					width:40px
					height:40px
					position:absolute
					top:50%
					margin-top:-20px
			.info
				flex:1
				.tag
					display:inline-block
					width:32px
					height:18px
					background-color:#e5e5e5
					color:#999
					line-height:18px
					font-size:12px
					text-align:center
				.title
					display:inline-block
					font-size:14px
					height:50px
					line-height:50px
					width:180px
					overflow:hidden
					white-space:nowrap
					text-overflow:ellipsis
					position:absolute
					margin-left:10px
				.count
					display:inline-block
					font-size:12px
					height:50px
					line-height:50px
					margin-right:5px
				.good
					background-color:#31c27c
					color:#fff
			.time
				flex:0 0 58px
				color:#778087
				font-size:12px
				width:58px
				overflow:hidden
				white-space:nowrap
				text-overflow:ellipsis
</style>