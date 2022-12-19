<template>
  <div style="width: 100%; height: 100vh; background: paleturquoise; overflow: hidden">
    <div style="width: 400px;margin: 150px auto">
      <div style="color: red;font-size: 30px;text-align: center;padding: 30px" >环境监测信息管理系统</div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item label="用户名" prop="marketAccountName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="marketAccountPass">
          <el-input v-model="form.passWord" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 20%;margin: 20px auto;" type="primary" @click="adminLogin">管理员登录</el-button>
          <el-button style="width: 20%;margin: 20px auto;" type="primary" @click="login">用户登录</el-button>
          <el-button style="width: 20%;margin: 20px auto;" type="primary" @click="$router.push('/register')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import requests from "@/utils/requests";
import router from "@/router";

export default {
  name: "login",
  data(){
    return{
      form:{
        userName:"",
        passWord:""
      }
  }
  },
  methods:{
    login(){
      requests.post("/user/login",this.form).then(res =>{
        console.log(res)
        if(res.code == "200"){
          this.$message({
            type:"success",
            message:"登录成功"});
          localStorage.setItem("user",JSON.stringify(res.data));
          router.push("user");
        }
        else{
          this.$message({
            type:"fail",
            message:res.msg});
        }
      });
  },
    adminLogin(){
      requests.post("/admin/login",this.form).then(res =>{
        console.log(res)
        if(res.code == "200"){
          this.$message({
            type:"success",
            message:"登录成功"});
          localStorage.setItem("user",JSON.stringify(res.data));
          router.push("admin");
        }
        else{
          this.$message({
            type:"fail",
            message:res.msg});
        }
      });
    },
  }
}
</script>

<style scoped>

</style>