<template>
  <div style="height: 50px;line-height: 50px;border-bottom: 1px solid springgreen;display: flex">
    <div style="width: 200px;padding-left: 30px;font-weight: bold;color: deepskyblue">大气环境监测 用户端</div>
    <div style="flex: 1"></div>
    <div style="width: 100px;font-weight: bold;padding-top: 14px">
      <el-dropdown>
    <span class="el-dropdown-link">
      退出
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {ArrowDown} from "@element-plus/icons";
import router from "@/router";
export default {
  name: "Header_user",
  props:['market_data'],
  components:{
    ArrowDown
  },
  data(){
    return{
    }
  },
  created() {
  },
  methods:{
    logout(){
      localStorage.clear();
      router.push('/login');
    },
  }
}
</script>

<style scoped>

</style>