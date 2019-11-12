<template>
	<div id="index">
		<el-container style="height: 100vh; border: 1px solid #eee">
			<el-menu :default-openeds="['1', '3']">
				<el-menu-item-group>
				<el-menu-item index="1-1" @click="indexs(0)">首页轮播图</el-menu-item>
				<el-menu-item index="1-2" @click="indexs(1)">首页课程推荐</el-menu-item>
				<el-menu-item index="1-3" @click="indexs(2)">课程推荐</el-menu-item>
				</el-menu-item-group>
			</el-menu>
			<!-- 右侧 -->
			
			<div>
				<el-container>
					<el-header  style="line-height:50px;text-align:right;color:green;font-size:15px;">
						<div @click="newz()">添加</div>
					</el-header>
				</el-container>
				<div class="box" v-show="show">
					<div v-show="!indexz == 0">名字：<input type="text" v-model="names"></div>
					<div>图片：<input type="text" v-model="pics"></div>
					<div  @click="news">提交</div>
				</div>
				<el-table v-show="indexz == 0" :data="swiper" border :style="{height:heights}">
					<el-table-column prop="pic" label="图片" width="200"> </el-table-column>
					<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small" @click="gai(scope)">编辑</el-button>
						<el-button type="text" size="small" @click="rem(scope)">删除</el-button>
					</template>
					</el-table-column>
				</el-table>

				<el-table v-show="indexz == 1" :data="index" border :style="{height:heights}">
					<el-table-column prop="name" label="名字" width="150"> </el-table-column>
					<el-table-column prop="pic" label="图片" width="200"> </el-table-column>
					<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small" @click="gai(scope)">编辑</el-button>
						<el-button type="text" size="small" @click="rem(scope)">删除</el-button>
					</template>
					</el-table-column>
				</el-table>

				<el-table v-show="indexz == 2" :data="list" border :style="{height:heights}">
					<el-table-column prop="name" label="名字" width="150"> </el-table-column>
					<el-table-column prop="pic" label="图片" width="200"> </el-table-column>
					<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small" @click="gai(scope)">编辑</el-button>
						<el-button type="text" size="small" @click="rem(scope)">删除</el-button>
					</template>
					</el-table-column>
				</el-table>
			</div>
		</el-container>
	</div>
</template>

<script>
  export default {
    data() {
      	return {
			heights:'',
			indexz:0,
			lengths:0,
			show:false,
			names:'',
			pics:'',
			bianji:false,
			shuju:[],
			swiper:[
				{
					pic:'1'
				},
				{
					pic:'10'
				}
			],
			index:[
				{
					name:'2',
					pic:'2'
				}
			],
			list:[
				{
					name:'3',
					pic:'3'
				}
			]
		}
	},
    methods: {
      	handleClick(row) {
			console.log(row);
	  	},
	  	indexs(a){
		  	this.indexz = a;
		  	if(this.indexz == 0){
				this.heights = this.swiper.length * 57+64+'px';
		  	}else if(this.indexz == 1){
				this.heights = this.index.length * 57+64+'px';
			}else{
				this.heights = this.list.length * 57+64+'px';
			}
		},
		newz(){
			this.show = true;
			this.bianji = true;
		},
		news(){
			if(this.bianji){
				var list = [ ];
				if(this.indexz == 0){
					list = this.swiper;
					this.lengths = this.swiper.length;
					this.$set(this.swiper,this.lengths,{pic:this.pics})
					this.swiper = list;
					this.pics = ' ';
					console.log(this.swiper)
				}else if(this.indexz == 1){
					list = this.index;
					this.lengths = this.index.length;
					this.$set(this.index,this.lengths,{name:this.names,pic:this.pics})
					this.index = list;
					this.pics = ' ';
					this.names = ' ';
					console.log(this.index)
				}else if(this.indexz == 2){
					list = this.list;
					this.lengths = this.list.length;
					this.$set(this.list,this.lengths,{name:this.names,pic:this.pics})
					this.list = list;
					this.pics = ' ';
					this.names = ' ';
					console.log(this.list)
				}
			}else{
				if(this.indexz == 0){
					console.log(10)
					
				}else if(this.indexz == 1){
					console.log(20)
				}else if(this.indexz == 2){
					console.log(30)
				}
			}
			this.show = false;
		},
		gai(a){
			this.show = true;
			this.bianji = false;
			this.pics = a.row.pic;
			// console.log(this.pics)
		},
		rem(a){
			this.show = true;
			this.bianji = false;
		}  
	},
	created(){
		this.heights = this.swiper.length * 57+64+'px';
	}
  }
</script>
<style>
.box{
	position:absolute;
	top:50%;
	left:50%;
	margin:-150px 0 0 -150px;
	width:300px;
	height:300px;
	border:1px solid red;
}
</style>