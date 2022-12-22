<template>
  <div>
    <!--  <Header/>头部-->
    <Header_user/>
    <!--  主体-->
    <div style="display: flex">
      <!--  <Aside/>侧边栏-->
      <Aside_user/>
      <!--    内容-->
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>
import Header_user from "@/components/Header_user";
import Aside_user from "@/components/Aside_user";
import requests from "@/utils/requests";

export default {
  name: "Layout_user",
  components:{
    Header_user,
    Aside_user,
  },
  created() {
    this.load();
  },
  methods:{
    load(){
      requests.get("/user/data").then(res => {this.res = res.data})
    },
  }
}
</script>

<style scoped>

</style>