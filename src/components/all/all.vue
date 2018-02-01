<template>
	<div class="page">
		<tab></tab>
		<div class="child" v-for='ltem in articleList' ref='child' @click='select(ltem.id)'>
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
		<showdetail :showdetail='selectList' ref='showdetail'></showdetail>
		<footnav rel='footnav'></footnav>	
	</div>
</template>
<script>
	import showdetail from '../showdetail/showdetail'
	import footnav from '../footnav/footnav'
	import tab from '../tab/tab'
	export default{
		data(){
			return{
				articleList:[],
				selectList:0
			}
		},
		components:{
			showdetail,
			footnav,
			tab
		},
		mounted(){
		  this.getData(1,'all');
		  window.addEventListener('scroll',this.getMoreData);
		  this.$nextTick(()=>{
		  	this.getMoreData();
		  })
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
		watch:{
			//监听路由，只要路由有变化(路径，参数等变化)都有执行下面的函数，你可以
			$route: {
			    handler: function (val, oldVal) {
			       let _urlParams = this.$route.params;
			       //console.log(val);
			       let tab=val.fullPath;
			       tab=tab.substring(1);
			       this.getData(1,tab);
			        //created事件触发的函数可以在这里写...  
			        //都是componentA组件，声明周期还在，改变不了
			    },
			    deep: true
			}
		},
		methods:{
		  getData:function(page,tab){
		    this.$http({
		      methods:'get',
		      url:'https://www.vue-js.com/api/v1/topics',
		      params:{
		        page:page,
		        tab:tab,
		        limit:20,
		        mdrender:true
		      }
		    }).then(function(data){
		      //console.log(data);
		      this.articleList=data.body.data;
		    })
		  },
		  select(id){
		  	this.selectList=id;
		  	//console.log(this.selectList);
		  	this.$refs.showdetail.show();
		  },
		  getMoreData:function(){
		  	let page=2;
		  	let scrollHeight=document.documentElement.scrollTop;//获取滚动的高度
		  	let screenHeight=document.documentElement.clientHeight;//网页可视区域高度
		  	let documentHeight=document.body.scrollHeight;//整个文档高度
		  	let tab=location.href;
		  	let index_of=tab.indexOf('#');
		  	tab=tab.substring(index_of+2);
		  	if (scrollHeight+screenHeight>=documentHeight) {
		  		this.$http({
		  		  methods:'get',
		  		  url:'https://www.vue-js.com/api/v1/topics',
		  		  params:{
		  		    page:page,
		  		    tab:tab,
		  		    limit:20,
		  		    mdrender:true
		  		  }
		  		}).then(function(data){
		  		let datas=data.body.data;
		  		for(let dat of datas){
		  			this.articleList.push(dat);
		  		}
		  		  console.log(this.articleList);
		  		})
		  	}
		  	page++;
		  }
		}
	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
	.page
		.child
			padding :0px 15px
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