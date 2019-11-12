<template>
	<div id="index">
		<div class="boxz">
			<!-- 左侧 -->
			<div class="left">
				<div :class="{'nows':nows==0}" @click="indexs(0)">查看管理员</div>
				<div :class="{'nows':nows==1}" @click="indexs(1)">首页轮播图</div>
				<div :class="{'nows':nows==2}" @click="indexs(2)">首页课程推荐</div>
				<div :class="{'nows':nows==3}" @click="indexs(3)">地点</div>
			</div>
			<!-- 右侧 -->
			<div class="right">
				<div class="tops" @click="news()">
					添加
				</div>
				<div class="look" v-show="tops">
					<div>名字(此值为下标时,无法修改)</div>
					<div>图片</div>
					<div>操作</div>
				</div>
				<div class="look" v-show="!tops">
					<div>用户名</div>
					<div>密码</div>
					<div>操作</div>
				</div>
				<div class="texts">
					<div v-show="pages == 0">
						<div class="uls a0" v-show="pages == 0" v-for="(item,indexa) in peo" :key="indexa">
							<div>{{item.name}}</div>
							<div>{{item.pass}}</div>
							<div>
								<span @click="rem(indexa)">删除</span>
							</div>
						</div>
					</div>
					<div class="uls a1" v-show="pages == 1" v-for="(item,index) in swiper" :key="'a1'+index">
						<div>{{index}}</div>
						<div>{{item}}</div>
						<div>
							<span @click="xiu(index,item)">编辑</span>
							<span @click="rem(index)">删除</span>
						</div>
					</div>
					<div class="uls a2" v-show="pages == 2" v-for="(items,indexs) in index" :key="'a2'+indexs">
						<div>{{items.txt}}</div>
						<div>{{items.pic}}</div>
						<div>
							<span @click="xiu(indexs,items)">编辑</span>
							<span @click="rem(indexs)">删除</span>
						</div>
					</div>
					<div class="uls a3" v-show="pages == 3" v-for="(itemz,indexz) in list" :key="'a3'+indexz">
						<div>{{itemz.name}}</div>
						<div>{{itemz.img}}</div>
						<div>
							<span @click="xiu(indexz,itemz)">编辑</span>
							<span @click="rem(indexz)">删除</span>
						</div>
					</div>
				</div>
				<!-- 弹出框 -->
				<div class="newBox" v-show="show">
					<div class="thost">
						<div v-show="tops">
							<div>
								名字：<input type="text" v-model="names">
							</div>
							<div>
								图片：<input type="text" v-model="pics">
							</div>
							<div class="zzz" @click="no_news()">提交</div>
							<div class="zzz" @click="no_newz()">关闭</div>
						</div>
						<div v-show="!tops">
							<div>
								账户：<input type="text" v-model="names">
							</div>
							<div>
								密码：<input type="text" v-model="pics">
							</div>
							<div class="zzz" @click="no_news()">提交</div>
							<div class="zzz" @click="no_newz()">关闭</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
    data() {
      	return {
			nows:0,
			pages:0,	//页面
			show:false,	//显示弹出框
			names:'',	//添加名字
			pics:'',	//图片地址
			titx:true,	//当前弹出框的状态
			num:'',		//当前下标
			tops:false,	//控制头部
			peo:[
				{
					name:111,
					pass:222
				},
				{
					name:222,
					pass:333
				}
			],
			swiper:[],
			index:[],
			list:[]
		}
	},
    methods: {
		indexs(a){
			this.nows = a;
			this.pages = a;
			if(this.pages == 0){
				this.tops = false;
			}else{
				this.tops = true;
			}
		},
      	xiu(num,nei){
			this.titx = false;
			this.show = true; 
			this.names = nei.txt || nei.name || num;
			this.pics = nei.pic || nei.img || nei;
			this.num = num;
		},
		rem(a){
			if(this.pages == 0){
				this.peo.splice(a,1);
			}else if(this.pages == 1){
				this.swiper.splice(a,1);
			}else if(this.pages == 2){
				this.index.splice(a,1);
			}else if(this.pages == 3){
				this.list.splice(a,1);
			}
		},
		news(){
			this.show = true;
			this.titx = true;
		},
		no_news(){
			this.show = false;
			if(!this.tops){
				this.peo.push({
					name:this.names,
					pass:this.pics
				});	
			}else{
				if(this.titx){
					if(this.pages == 1){
						this.swiper.push(this.pics)
					}else if(this.pages == 2){
						this.index.push({
							txt:this.names,
							pic:this.pics
						})
					}else if(this.pages == 3){
						this.list.push({
							name:this.names,
							img:this.pics
						})
					}
				}else{
					if(this.pages == 1){
						this.swiper.splice(this.num,1,this.pics);
					}else if(this.pages == 2){
						this.index.splice(this.num,1,{
							txt:this.names,
							pic:this.pics
						});
					}else if(this.pages == 3){
						this.list.splice(this.num,1,{
							name:this.names,
							img:this.pics
						});
					}
				}
			}
			this.names = '';
			this.pics = '';
			this.num = '';
		},
		no_newz(){
			this.show = false;
			this.names = '';
			this.pics = '';
			this.num = '';
		}
	},
	created(){
		this.$axios.post("http://192.168.32.122:8800/index").then(res=>{
			this.swiper = res.data.index.bannerPic;
			this.index = res.data.index.recList
		}),
		this.$axios.post("http://192.168.32.122:8800/contact").then(res=>{
			this.list = res.data.contact.datas
		})
		// window.location.reload()
	}
  }
</script>
<style>
.right{
	float:left;
}
.left{
	float:left;
	width:9vw;
	border-right:1px solid #ccc;
	height:100vh;
	min-width:100px;
}
.left div{
	width:100%;
	height:30px;
	padding-left:20px;
	line-height:30px;
	margin-top:10px;
	cursor:pointer;
}
.nows{
	background:red;
	color:white;
}
.tops{
	width:85vw;
	height:5vh;
	border-bottom:1px solid #ccc;
	border-right:1px solid #ccc;
	line-height:4.5vh;
	text-align:right;
	padding-right:20px;
	color:red;
	font-size:16px;
	font-weight:bold;
}
.look{
	width:85vw;
	height:5vh;
	line-height:5vh;
	display: flex;
	justify-content: space-around;
	border-bottom:1px solid #ccc;
	border-right:1px solid #ccc;
	color:red;
	font-size:14px;
	font-weight:bold;
}
.look div{
	width:33%;
	text-align:center;
}
.texts{
	width:85vw;
	height:89.8vh;
	overflow-y:scroll;
	overflow-x:hidden;
}
.uls{
	width:85vw;
	height:5vh;
	line-height:5vh;
	display:flex;
	justify-content: space-around;
	border-bottom:1px solid #ccc;
}
.uls div{
	width:33%;
	height:5vh;
	text-align:center;
	overflow:hidden;
}
.newBox{
	width:100vw;
	height:100vh;
	background:rgba(0,0,0,0.5);
	position:absolute;
	top:0;
	left:0;
}
.thost{
	width:300px;
	height:300px;
	position:absolute;
	top:50%;
	left:50%;
	margin:-150px 0 0 -150px;
	border:1px solid #ccc;
	background:white;
	display:flex;
	flex-direction:column;
	justify-content: center;
	align-items:center;
}
.thost div div{
	width:200px;
	height:30px;
	margin-bottom:20px;
	text-align:center;
	line-height:30px;
}
.zzz{
	text-align:center;
	background:orange;
	color:white;
}
</style>