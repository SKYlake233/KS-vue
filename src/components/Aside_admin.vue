<template>
  <div>
    <!--  :default-active="$route.path.substr(1)"左边导航栏实时高亮-->
    <el-menu
        style=" width: 200px;min-height: calc(100vh - 50px)"
        :default-active="$route.path.substr(1)"
        router
        class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title>管理</template>
        <el-menu-item index="device" >管理设备</el-menu-item>
        <el-menu-item index="place" >监测点管理</el-menu-item>
        <el-menu-item index="item" >设备分配管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>数据</template>
        <el-menu-item index="device" >各地点数据</el-menu-item>
        <el-menu-item index="place" >各地点数据图</el-menu-item>
        <el-menu-item index="place" >变化情况</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside_admin"
}
</script>

<style scoped>

</style>