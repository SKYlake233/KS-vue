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
        <el-form-item label="昵称" prop="marketAccountPass">
          <el-input v-model="form.nickName" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="marketAccountPass">
          <el-input v-model="form.email" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 20%;margin: 20px auto;" type="primary" @click="register">登录</el-button>
          <el-button style="width: 20%;margin: 20px auto;" type="primary" @click="$router.push('/login')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import requests from "@/utils/requests";
import router from "@/router";

export default {
  name: "register",
  data(){
    return{
      form:{
        userName:"",
        passWord:"",
        nickName:"",
        email:""
      }
    }
  },
  methods:{
    register(){
      requests.post("/user/register",this.form).then(res =>{
        if(res.code == "200"){
          this.$message({
            type:"success",
            message:"注册成功"});
          router.push("login");
        }
        else{
          this.$message({
            type:"fail",
            message:res.code+res.msg});
        }
      });
    }
  }
}
</script>

<style scoped>

</style>