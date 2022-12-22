<template>
  <el-menu
      style=" width: 200px;min-height: calc(100vh - 50px)"
      :default-active="$route.path.substr(1)"
      router
      class="el-menu-vertical-demo">
    <el-sub-menu index="1">
      <template #title>管理</template>
      <el-menu-item index="dataview" >最新数据查看</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside_user"
}
</script>

<style scoped>

</style>