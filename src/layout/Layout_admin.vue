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

export default {
  name: "Layout_admin",
  components:{
    Header_admin,
    Aside_admin,
  }
}
</script>
import Header_comm from "@/components/Header_admin";
import Aside_comm from "@/components/Aside_admin";

export default {
name: "Layout_comm",
components:{
Header_comm,
Aside_comm,
}
}

<style scoped>

</style>