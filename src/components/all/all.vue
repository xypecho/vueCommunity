<template>
	<div class="page">
		<div class="child" v-for='ltem in articleList' @click=>
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
			<div class="time">{{ltem.last_reply_at | formattime}}</div>
		</div>
		<showdetail></showdetail>
	</div>
</template>
<script>
	import showdetail from './components/showdetail/showdetail'
	export default{
		data(){
			return{
				articleList:[]
			}
		},
		components:{
			showdetail
		},
		mounted(){
		  this.getData();
		},
		filters:{
			formattime:function(val){
				let result;
				val=Date.parse(val);//最后回复的时间戳
				let min=1000*60;//分
				let hour=min*60;//时
				let day=hour*24;//天
				let halfmonth=day*15;//半个月
				let month=day*30;//一个月
				let now=new Date().getTime();//获取当前时间戳
				let difftime=now-val;
				if(difftime<0){
					return false;
				}
				let monthC=difftime/month;
				let weekC=difftime/(day*7);
				let dayC=difftime/day;
				let hourC=difftime/hour;
				let minC=difftime/min;
				if(monthC>=1){
					result="" + parseInt(monthC) + "月前";
				}
				else if(weekC>=1){
					result="" + parseInt(weekC) + "周前";
				}
				else if(dayC>=1){
					result=""+ parseInt(dayC) +"天前";
				}
				else if(hourC>=1){
					result=""+ parseInt(hourC) +"小时前";
				}
				else if(minC>=1){
					result=""+ parseInt(minC) +"分钟前";
				}else
				result="刚刚";
				return result;
			}
		},
		methods:{
		  getData:function(){
		    this.$http({
		      methods:'get',
		      url:'https://www.vue-js.com/api/v1/topics',
		      params:{
		        page:1,
		        tab:'all',
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
				text-align:right
</style>