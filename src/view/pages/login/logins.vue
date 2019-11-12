<template>
  <div>
    <el-header>登录</el-header>
    <el-form>
      <el-form-item label="用户名:" label-width="80px">
        <el-input placeholder="4-16位(字母、数字、下划线、减号)" v-model="form.account" style="width:300px;font-size:10px;"></el-input>
      </el-form-item>
      <el-container v-show="accountStatus">您的用户名不符合标准</el-container>
      <el-form-item label="密码:" label-width="80px">
        <el-input type="password" placeholder="最少6位,至少包含一个大写字母,一个小写字母,一个数字" v-model="form.password" style="width:300px;font-size:10px;"></el-input>
      </el-form-item>
      <el-container v-show="passwordStatus">您的密码不符合标准</el-container>
      <el-button type="primary" @click="onSubmit">立即登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        form:{
          account:null,
          password:null
        },
        accountStatus:false,
        passwordStatus:false,
        sub:{}
      }
    },
    methods:{
      onSubmit() {
        var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
       if(uPattern.test(this.form.account)==true){
         if(pPattern.test(this.form.password)==true){
            this.sub=this.form
            this.accountStatus=false
            this.passwordStatus=false
            console.log('跳转')
            this.$router.push({path:'/indexs'})
         }else{
           this.passwordStatus=true
         }
       }else{
         if(pPattern.test(this.form.password)==true){
            this.accountStatus=true
         }else{
           this.accountStatus=true
           this.passwordStatus=true
         }
       }
        console.log(this.sub)
     }
    }
  }
</script>

<style>
  .el-header{
    margin-top: 50px;
    width: 100%;
    text-align: center;
    font: 30px/30px '楷体';
  }
  .el-form{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .el-form-item{
   width: 100%;
   display: flex;
   justify-content: center;
  }
  .el-form-item .el-form-item__label{
    text-align: left;
  }
  .el-button{
    width: 15%;
  }
  .el-form-item__content{
    margin-left: 0 !important;
  }
  .el-input{
    width: 100%;
  }
  .el-container{
    display: block;
    text-align: center;
    width: 100%;
    margin: 0px 0px 10px 0px;
    color: red;
  }
</style>
