<!--管理用户布局文件-->
<template>
  <div>
    <!--  <Header/>头部-->
    <Header_admin/>
    <!--  主体-->
    <div style="display: flex">
      <!--  <Aside/>侧边栏-->
      <Aside_admin/>
      <!--    内容-->
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>
import Header_admin from "@/components/Header_admin";
import Aside_admin from "@/components/Aside_admin";
import requests from "@/utils/requests";

export default {
  name: "Layout_admin",
  components:{
    Header_admin,
    Aside_admin,
  },
  created() {
    this.load();
  },
  methods:{
    load(){
      requests.get("/admin/data").then(res => {this.res = res.data})
    },
  }
}
</script>
<style scoped>

</style>